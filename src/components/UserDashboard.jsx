import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button, Spinner, Alert, Modal } from "react-bootstrap";
import { User, LogOut, Car, XCircle, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from 'react-icons/fa';
import "./UserDashboard.css";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [buttonColor, setButtonColor] = useState("warning");
  const navigate = useNavigate();

  const fetchUserData = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authentication required. Please log in.");
      return;
    }

    return fetch("http://localhost:3000/users/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        return response.json();
      })
      .then((result) => {
        setUserData(result);
      })
      .catch((err) => {
        setError(err.message);
        console.error("Error fetching user data:", err);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchUserData()
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("Failed to load user data.");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleButtonClick = () => {
    setButtonColor("success");
    setTimeout(() => {
      setButtonColor("warning");
    }, 2000);
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container className="dashboard-container my-5">
      <Row className="justify-content-center flex-nowrap">
        {/* Profile Block */}
        <Col md={3} className="d-flex">
          <Card className="shadow-lg text-center dashboard-block profile w-100">
            <Card.Body className="d-flex flex-column justify-content-between">
              <User size={50} className="mb-3" style={{ color: "black" }} />
              <h4>{userData?.name || "Guest User"}</h4>
              <p>Phone: {userData?.phone || "N/A"}</p>
              <p>License: {userData?.licenseNumber || "N/A"}</p>
              <Button variant={buttonColor} className="mt-auto" onClick={handleLogout}>
                <LogOut size={20} className="me-2" /> Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Booking Block */}
        <Col md={2} className="d-flex">
          <Card className="shadow-lg text-center dashboard-block booking w-100">
            <Card.Body className="d-flex flex-column justify-content-between">
              <Car size={50} className="mb-3" style={{ color: "black" }} />
              <h4>Book a Car</h4>
              <Button variant={buttonColor} className="mt-auto" onClick={() => navigate("/useravailable-cars")}>
                Book Now
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Switch Car Block */}
        <Col md={2} className="d-flex">
          <Card className="shadow-lg text-center dashboard-block switch-car w-100">
            <Card.Body className="d-flex flex-column justify-content-between">
              <Car size={50} className="mb-3" style={{ color: "black" }} />
              <h4>Switch Car</h4>
              <Button variant={buttonColor} className="mt-auto" onClick={() => navigate("/user/switch-car")}>
                Switch Car
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Cancel Car Block */}
        <Col md={2} className="d-flex">
          <Card className="shadow-lg text-center dashboard-block cancel-car w-100">
            <Card.Body className="d-flex flex-column justify-content-between">
              <XCircle size={50} className="mb-3" style={{ color: "black" }} />
              <h4>Cancel Car</h4>
              <Button variant={buttonColor} className="mt-auto" onClick={() => navigate("/user/cancel-car")}>
                Cancel Car
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Offers Block */}
        <Col md={2} className="d-flex">
          <Card className="shadow-lg text-center dashboard-block offers w-100">
            <Card.Body className="d-flex flex-column justify-content-between">
              <Gift size={50} className="mb-3" style={{ color: "black" }} />
              <h4>Special Offers</h4>
              <Button variant={buttonColor} className="mt-auto" onClick={() => navigate("/user/offers")}>
                View Offers
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Submit Button and View Car Collection */}
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Button variant="info" className="btn-lg" onClick={() => navigate("/user/car-collection")}>
            View Car Collection
          </Button>
        </Col>
      </Row>

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/9037159068" target="_blank" rel="noopener noreferrer" className="whatsapp-button" onClick={handleShowModal}>
        <FaWhatsapp size={50} color="white" className="whatsapp-icon" />
      </a>

      {/* WhatsApp Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Any Queries? Connect with Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>If you have any questions or need assistance, feel free to reach out to us via WhatsApp.</p>
          <p><strong>Phone:</strong> 9037159068</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="success" href="https://wa.me/9037159068" target="_blank" rel="noopener noreferrer" onClick={handleCloseModal}>
            Connect on WhatsApp
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserDashboard;
