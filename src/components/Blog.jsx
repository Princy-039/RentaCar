import { useEffect, useState } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/blog") // Adjust the URL if needed
      .then((response) => response.json())
      .then((data) => {
        if (data.blogs) {
          setBlogs(data.blogs);
        }
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const handleReadMore = (url) => {
    window.location.href = url;
  };

  return (
    <section id="blog" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold text-primary mb-5" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          Our Blog
        </h2>
        <div className="row g-4">
          {blogs.map((item, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div
                className="card text-left shadow-sm h-100 border-0"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                }}
              >
                <img
                  src={`http://localhost:3000${item.image}`} // Ensure backend serves images correctly
                  alt={item.title}
                  className="img-fluid"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column p-4">
                  <h5 className="card-title fw-bold" style={{ fontFamily: "'Times New Roman', serif" }}>
                    {item.title}
                  </h5>
                  <p className="card-text flex-grow-1 text-muted" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    {item.description}
                  </p>
                  <button
                    onClick={() => handleReadMore(item.link)}
                    className="btn btn-primary mt-auto shadow-sm"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
