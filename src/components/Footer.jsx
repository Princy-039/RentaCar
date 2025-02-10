import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        {/* Top Section */}
        <div className="row align-items-center">
          <div className="col-md-6 text-md-start text-center">
            <h5 className="fw-bold text-warning">Stay Connected with Qdrive</h5>
            <p>Follow us for the latest updates, offers, and travel inspiration.</p>
            <div className="d-flex justify-content-center justify-content-md-start">
              <a href="https://facebook.com/Qdrive" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com/Qdrive" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <FaInstagram size={24} />
              </a>
              <a href="https://twitter.com/Qdrive" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com/company/Qdrive" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {/* Middle Section */}
        <div className="row">
          <div className="col-md-4">
            <h6 className="fw-bold text-warning">Contact Us</h6>
            <p>
              <FaMapMarkerAlt className="me-2" /> Qdrive, Kochi, Kerala, India
            </p>
            <p>
              <FaPhoneAlt className="me-2" /> +91 12345 67890
            </p>
            <p>
              <FaEnvelope className="me-2" /> support@qdrive.in
            </p>
          </div>
          <div className="col-md-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.755228726726!2d76.326655314793!3d9.981635392864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c6d0b0b0b0b%3A0x0!2sQDrive%20Rent%20a%20Car!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Qdrive Location"
            ></iframe>
          </div>
        </div>

        <hr className="my-4" />

        {/* Bottom Section */}
        <div className="text-center">
          <p className="mb-0">&copy; 2025 Qdrive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
