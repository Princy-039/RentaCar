import { useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Upload } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserProfile.css";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(""); // For image preview
  const [loading, setLoading] = useState(true); // For fetching user data
  const [submitLoading, setSubmitLoading] = useState(false); // For form submission
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });

        const result = await response.json();
        if (response.ok) {
          setName(result.name);
          setEmail(result.email);
          setPhone(result.phone);
          setLicenseNumber(result.licenseNumber || "");
          setAddress(result.address || "");
          setPreview(result.photo || ""); // Set preview to existing photo
        } else {
          setError(result.message || "Failed to fetch user data.");
        }
      } catch (error) {
        setError("An error occurred. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Auto clear messages
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  // Handle file change and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      setPreview(URL.createObjectURL(file)); // Show preview immediately
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !licenseNumber || !address) {
      setError("Please fill in all required fields.");
      return;
    }

    // Optional basic validation
    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number should be 10 digits.");
      return;
    }
    if (licenseNumber.length < 5) {
      setError("License number is too short.");
      return;
    }

    setError("");
    setMessage("Updating profile...");
    setSubmitLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("licenseNumber", licenseNumber);
    formData.append("address", address);
    if (photo) {
      formData.append("photo", photo); // Only append if a new photo is selected
    }

    try {
      const response = await fetch(`http://localhost:3000/users/${email}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Profile updated successfully!");
        if (result.photo) {
          setPreview(result.photo); // Update preview
        }
      } else {
        setError(result.message || "Failed to update profile.");
      }
    } catch (error) {
      setError("An error occurred. Please check your connection.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <Container className="profile-container">
      <h2 className="text-center">Edit Profile</h2>
      <Card className="profile-card">
        <Card.Body>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Profile Image Section */}
          <label className="profile-photo">
            {preview ? (
              <img
                src={preview.startsWith('blob') ? preview : `http://localhost:3000/${preview}`}
                alt="Profile"
                className="profile-img"
              />
            ) : (
              <div className="placeholder-img">No Image</div>
            )}
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="file-input-hidden"
            />
            <Upload size={24} className="upload-icon" />
          </label>

          {/* Profile Form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email (Cannot be changed)</Form.Label>
              <Form.Control type="email" value={email} disabled />
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="warning"
              type="submit"
              className="mt-3"
              disabled={submitLoading}
            >
              {submitLoading ? "Updating..." : "Update Profile"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfile;
