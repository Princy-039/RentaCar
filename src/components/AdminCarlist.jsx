import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./AdminCarList.css";

const AdminCarManagement = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    carNumber: "",
    carModel: "",
    carType: "SUV",
    pricePerDay: "",
    fuelType: "",
    seatCapacity: "",
    status: "Available",
    carTier: "Rented",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/cars/all")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  const handleChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newCar).forEach((key) => formData.append(key, newCar[key]));
    if (image) formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3000/cars", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setCars([...cars, data]);
      } else {
        console.error("Error adding car:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      console.log("Attempting to delete car with ID:", id);
      
      const token = localStorage.getItem("authToken"); 
      if (!token) {
        console.error("No authentication token found");
        return;
      }
  
      const response = await fetch(`http://localhost:3000/cars/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete car. Status: ${response.status}`);
      }
  
      console.log("Car deleted successfully");
      setCars((prevCars) => prevCars.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Error deleting car:", error.message);
    }
  };
  
  const handleUpdateStatus = async (car, newStatus) => {
    console.log("Car Data:", car); 

    const id = car._id || car.id; 
    console.log("Car ID:", id);

    if (!id) {
        console.error("Car ID is undefined!");
        return;
    }

    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.error("No token provided");
            return;
        }

        const response = await fetch(`http://localhost:3000/cars/${id}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus }),
        });

        if (!response.ok) {
            throw new Error("Failed to update status");
        }

        console.log("Status updated successfully");

        setCars((prevCars) =>
            prevCars.map((c) =>
                c._id === id ? { ...c, status: newStatus } : c
            )
        );

    } catch (error) {
        console.error("Error updating status:", error.message);
    }
  };

  return (
    <div className="admin-car-list">
      <div className="container">
        <h2 className="title">Admin Car Management</h2>

        {/* Back to Dashboard Button */}
        <button
          className="back-button"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <form className="car-form" onSubmit={handleAddCar}>
          <div className="form-grid">
            <input type="text" name="carNumber" placeholder="Car Number" onChange={handleChange} required />
            <input type="text" name="carModel" placeholder="Car Model" onChange={handleChange} required />
            <select name="carType" onChange={handleChange}>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Convertible">Convertible</option>
              <option value="Truck">Truck</option>
            </select>
            <input type="number" name="pricePerDay" placeholder="Price Per Day" onChange={handleChange} required />
            <input type="text" name="fuelType" placeholder="Fuel Type" onChange={handleChange} required />
            <input type="number" name="seatCapacity" placeholder="Seat Capacity" onChange={handleChange} required />
            <select name="carTier" onChange={handleChange}>
              <option value="rented">Rented</option>
              <option value="vintage">Vintage</option>
              <option value="wedding">Wedding</option>
            </select>
            <input type="file" accept="image/*" onChange={handleImageChange} required />
          </div>
          <button type="submit" className="add-button">Add Car</button>
        </form>

        <h3 className="title">Car List</h3>
        <div className="car-grid">
          {cars.map((car) => (
            <div key={car._id} className="car-card">
              {car.carImage && <img src={`http://localhost:3000/${car.carImage}`} alt="Car" className="car-image" />}
              <div className="car-details">
                <p><strong>Model:</strong> {car.carModel} ({car.carNumber})</p>
                <p><strong>Type:</strong> {car.carType} | <strong>Tier:</strong> {car.carTier}</p>
                <p><strong>Fuel:</strong> {car.fuelType} | <strong>Seats:</strong> {car.seatCapacity}</p>
                <p><strong>Status:</strong> {car.status}</p>
                <div className="actions">
                  <button className="delete-button" onClick={() => handleDeleteCar(car._id)}>Delete</button>
                  <select onChange={(e) => handleUpdateStatus(car, e.target.value)} defaultValue={car.status}>
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminCarManagement;
