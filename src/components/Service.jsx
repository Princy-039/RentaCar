import { useNavigate } from "react-router-dom";

const Service = () => {
  const navigate = useNavigate();  // Initialize useNavigate

  const service = [
    {
      title: "LEGAL RENTAL CARS",
      description: "Embark on an extraordinary journey",
      image: "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "LUXURY CARS",
      description: "Elevate your experience with our fleet of luxury cars",
      image: "https://images.pexels.com/photos/10215508/pexels-photo-10215508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "VINTAGE CARS",
      description: "Hit the road in style and freedom with us",
      image: "https://images.pexels.com/photos/1805053/pexels-photo-1805053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const handleNavigate = () => {
    navigate("/login");  // Navigate to /login
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold text-warning mb-5" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          Our Services
        </h2>
        <div className="row g-4 d-flex justify-content-center">
          {service.map((car, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div
                className="card h-100 shadow-sm border-0"
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
                <img src={car.image} alt={car.title} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{car.title}</h5>
                  <h6 className="text-muted">{car.category}</h6>
                  <p className="card-text text-muted">{car.description}</p>
                  <button
                    onClick={handleNavigate}
                    className="btn shadow-sm"
                    style={{ backgroundColor: "#808000", color: "white", border: "none" }}
                  >
                    See Collection
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

export default Service;
