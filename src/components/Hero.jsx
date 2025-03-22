import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="home"
      className="bg-dark text-light py-5 mt-5 d-flex align-items-center"
      style={{
        marginTop: "80px",
        backgroundImage: "url('https://images.pexels.com/photos/97458/pexels-photo-97458.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "80vh",
      }}
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          {/* Text Content */}
          <div className="col-lg-6 text-center  p-4 rounded">
            <h1 className="display-5 fw-bold text-warning mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Rent Your Ride
            </h1>
            <p className="lead text-light mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Seamless Car Rentals, Anytime, Anywhere.
            </p>
            {/* Link to Booking Page */}
            <Link to="/login">
              <button className="btn btn-warning btn-lg shadow-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
