import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CarCollection = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch car data from the backend API
    fetch("http://localhost:3000/cars/all") // Adjust this URL to your backend route
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching car data:", error));
  }, []);
  

  return (
    <section id="car-collection" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold text-warning mb-4">
          Car Collection
        </h2>
        

        {/* Display car collection */}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {cars.length === 0 ? (
            <p>Loading cars...</p>
          ) : (
            cars.map((car) => (
              <div key={car._id} className="col">
                <div
                  className="card h-100 shadow-sm border-0"
                  style={{
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src={`http://localhost:3000/${car.carImage}`}  // Fallback image
                    alt={car.carModel}
                    className="card-img-top"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body text-center p-4">
                    <h5 className="card-title fw-bold mb-3">
                      {car.carModel}
                    </h5>
                    <h6 className="card-text text-muted mb-2">
                      {car.carType} - {car.carTier}
                    </h6>
                    <h2 className="card-text text-warning mb-4">
                      ₹{car.pricePerDay}/day
                    </h2>
                    <ul className="list-unstyled mb-4">
                      <li className="text-muted">
                        Fuel: {car.fuelType}
                      </li>
                      <li className="text-muted">
                        Seats: {car.seatCapacity}
                      </li>
                      <li className="text-muted">
                        Status:{" "}
                        <span
                          className={
                            car.isAvailable ? "text-success" : "text-danger"
                          }
                        >
                          {car.isAvailable ? "Available" : "Booked"}
                        </span>
                      </li>
                    </ul>
                    <Link to={`/useravailable-cars`}>
                      <button className="btn btn-warning btn-lg shadow-sm">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CarCollection;
