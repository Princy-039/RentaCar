import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top shadow-sm py-3">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold fs-4 text-light" to="/">
          <span style={{ color: "#FFFF00" }}>Qdr</span>ive
        </Link>

        {/* Navbar Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Items */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-4">
            {["Home", "About Us"].map((section, index) => (
              <li key={index} className="nav-item">
                <Link className="nav-link text-light fw-medium" to={`/${section.toLowerCase()}`}>
                  {section}
                </Link>
              </li>
            ))}

            {/* Fleets Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-light fw-medium"
                href="#"
                id="fleetsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Fleets
              </a>
              <ul className="dropdown-menu">
                {[ "Legal Rental Cars", "Luxury Cars","Vintage Cars"].map((type, index) => (
                  <li key={index}>
                    <Link className="dropdown-item" to={`/fleets/${type.toLowerCase().replace(" ", "-")}`}>
                      {type}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Locations Dropdown (Appears After Fleets) */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-light fw-medium"
                href="#"
                id="locationsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Locations
              </a>
              <ul className="dropdown-menu">
                {["Kochi", "Kollam","Kakkanad","Kottarakara", "Pathanamthitta","Thiruvalla","Varkala"].map((city, index) => (
                  <li key={index}>
                    <Link className="dropdown-item" to={`/${city.toLowerCase()}`}>
                      {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Remaining Menu Items */}
            {["Offers","Blog","Testimonials", "Contact Us"].map((section, index) => (
              <li key={index} className="nav-item">
                <Link className="nav-link text-light fw-medium" to={`/${section.toLowerCase()}`}>
                  {section}
                </Link>
              </li>
            ))}
          </ul>

          {/* Sign Up & Login */}
          <div className="d-flex align-items-center gap-3">
            <Link className="btn btn-outline-light btn-sm" to="/signup">
              Sign Up
            </Link>
            <Link className="btn btn-light btn-sm" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
