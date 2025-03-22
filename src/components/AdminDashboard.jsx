import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import CancelIcon from "@mui/icons-material/Cancel";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [canceledBookings, setCanceledBookings] = useState([]);
  const [switchedCars, setSwitchedCars] = useState([]);

  // Access control for admin
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      alert("Access Denied: Admins only!");
      navigate("/");
    }
  }, [navigate]);

  // Fetch data on component mount
  useEffect(() => {
    fetch("http://localhost:3000/cars/all")
      .then((res) => res.json())
      .then((data) => setCars(data));

    fetch("http://localhost:3000/booking/all")
      .then((res) => res.json())
      .then((data) => setBookings(data));

    fetch("http://localhost:3000/booking/canceled-bookings")
      .then((res) => res.json())
      .then((data) => setCanceledBookings(data));

    fetch("http://localhost:3000/booking/switched-cars")
      .then((res) => res.json())
      .then((data) => setSwitchedCars(data.switchedCars));
  }, []);

  const availableCars = cars.filter((c) => c.availability === "available");

  // Navigation function
  const handleNavigate = (path) => navigate(path);

  // Reusable Stat Card component
  const StatCard = ({ icon, title, count, color, onClick }) => (
    <Grid item xs={10} sm={6} md={4}>
      <Card
        onClick={onClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          borderRadius: "12px",
          border: `5px solid ${color}`,
          height: "300px",
          cursor: "pointer",
          transition: "transform 0.3s",
          "&:hover": { transform: "translateY(-10px)" },
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <CardContent>
          {icon}
          <Typography variant="h6" gutterBottom>{title}</Typography>
          <Typography variant="h4">{count}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="secondary">View {title}</Button>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/qdrive.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        padding: "50px 20px",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        style={{
          color: "#8B0000",
          fontWeight: "bold",
          fontFamily: "sans-serif",
          marginBottom: "40px",
          
        }}
      >
        Admin Dashboard — Let's Keep the Wheels Turning Smoothly!
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <StatCard
          icon={<DirectionsCarIcon sx={{ fontSize: 60, color: "black", mb: 1 }} />}
          title="Total Cars"
          count={cars.length}
          color="green"
          onClick={() => handleNavigate("/admin/cars")}
        />
        <StatCard
          icon={<EventSeatIcon sx={{ fontSize: 60, color: "black", mb: 1 }} />}
          title="Total Bookings"
          count={bookings.length}
          color="green"
          onClick={() => handleNavigate("/admin/bookings")}
        />
        <StatCard
          icon={<CancelIcon sx={{ fontSize: 60, color: "black", mb: 1 }} />}
          title="Canceled Bookings"
          count={canceledBookings.length}
          color="green"
          onClick={() => handleNavigate("/admin/cancel-bookings")}
        />
        <StatCard
          icon={<SwapHorizIcon sx={{ fontSize: 60, color: "black", mb: 1 }} />}
          title="Switched Cars"
          count={switchedCars.length}
          color="green"
          onClick={() => handleNavigate("/admin/switch-car")}
        />
        <StatCard
          icon={<CheckCircleIcon sx={{ fontSize: 60, color: "black", mb: 1 }} />}
          title="Available Cars"
          // count={availableCars.length}
          color="green"
          onClick={() => handleNavigate("/available-cars")} // ✅ Navigate to available cars page
        />
      </Grid>
    </div>
  );
};

export default Dashboard;
