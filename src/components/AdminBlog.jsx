import { useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert, Row, Col, Spinner, Modal } from "react-bootstrap";
import { Trash2, ImageIcon, Link as LinkIcon, Edit2, Eye } from "lucide-react";

function BlogAdmin() {
  const [blog, setBlog] = useState({ title: "", description: "", link: "", image: null });
  const [blogs, setBlogs] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", description: "" });

  const token = localStorage.getItem("authToken"); // Fetch token from localStorage

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:3000/blog/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (response.ok) {
        setBlogs(result.blogs);
      } else {
        setError(result.message || "Failed to fetch blogs.");
      }
    } catch (error) {
      setError("An error occurred. Please check your connection.");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  // Handle image input
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setBlog({ ...blog, image: file });
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  // Handle Add or Update submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("description", blog.description);
      formData.append("link", blog.link);
      if (blog.image) formData.append("image", blog.image);

      const url = editMode
        ? `http://localhost:3000/blog/update/${editId}`
        : "http://localhost:3000/blog/add";
      const method = editMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(editMode ? "Blog updated successfully!" : "Blog created successfully!");
        resetForm();
        fetchBlogs(); // Refresh blogs
      } else {
        setError(result.error || "Failed to process request.");
      }
    } catch (error) {
      setError("An error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete (fixed: remove from UI without refresh)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await fetch(`http://localhost:3000/blog/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await response.json();
        if (response.ok) {
          setMessage("Blog deleted successfully!");
          setBlogs(blogs.filter((b) => b.id !== id)); // Update UI immediately
        } else {
          setError(result.error || "Failed to delete blog.");
        }
      } catch (error) {
        setError("An error occurred. Please check your connection.");
      }
    }
  };

  // Handle Edit
  const handleEdit = (blog) => {
    setBlog({
      title: blog.title,
      description: blog.description,
      link: blog.link,
      image: null,
    });
    setPreview(`http://localhost:3000${blog.image}`);
    setEditMode(true);
    setEditId(blog.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset form
  const resetForm = () => {
    setBlog({ title: "", description: "", link: "", image: null });
    setPreview(null);
    setEditMode(false);
    setEditId("");
  };

  // Handle Show Full Description
  const handleShowDescription = (title, description) => {
    setModalContent({ title, description });
    setShowModal(true);
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">{editMode ? "Update Blog" : "Add Blog"}</h2>

      {message && <Alert variant="success" onClose={() => setMessage("")} dismissible>{message}</Alert>}
      {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}

      {/* Blog Form */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={blog.title} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={blog.description} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><LinkIcon className="me-2" size={18} />Link</Form.Label>
              <Form.Control type="url" name="link" value={blog.link} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><ImageIcon className="me-2" size={18} />Image</Form.Label>
              <Form.Control type="file" onChange={handlePictureChange} accept="image/*" />
              {preview && <img src={preview} alt="Preview" className="mt-2" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />}
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : (editMode ? "Update Blog" : "Add Blog")}
              </Button>
              {editMode && <Button variant="secondary" onClick={resetForm}>Cancel Edit</Button>}
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Blogs List */}
      <h3 className="text-center mb-4">All Blogs</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {blogs.map((b) => (
          <Col key={b.id}>
            <Card className="h-100 shadow-sm">
              {b.image && <Card.Img variant="top" src={`http://localhost:3000${b.image}`} />}
              <Card.Body>
                <Card.Title>{b.title}</Card.Title>
                <Card.Text>{b.description.slice(0, 100)}...</Card.Text>
                {b.link && <a href={b.link} target="_blank" rel="noopener noreferrer">Read More</a>}
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button size="sm" variant="outline-success" onClick={() => handleShowDescription(b.title, b.description)}><Eye size={16} /></Button>
                <Button size="sm" variant="outline-primary" onClick={() => handleEdit(b)}><Edit2 size={16} /></Button>
                <Button size="sm" variant="outline-danger" onClick={() => handleDelete(b.id)}><Trash2 size={16} /></Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Full Description */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>{modalContent.title}</Modal.Title></Modal.Header>
        <Modal.Body>{modalContent.description}</Modal.Body>
      </Modal>
    </Container>
  );
}

export default BlogAdmin;
