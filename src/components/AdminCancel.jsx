import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminCancel = () => {
  const [canceledBookings, setCanceledBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch canceled bookings on component mount
  useEffect(() => {
    fetch("http://localhost:3000/booking/canceled-bookings")
      .then((res) => res.json())
      .then((data) => {
        setCanceledBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching canceled bookings:", error);
        setLoading(false);
        alert("Failed to load canceled bookings.");
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ color: "#8B0000", fontWeight: "bold", marginBottom: "30px" }}
      >
        Canceled Bookings — Admin Panel
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/admin/dashboard")}
        style={{ marginBottom: "20px" }}
      >
        ← Back to Dashboard
      </Button>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : canceledBookings.length === 0 ? (
        <Typography align="center" variant="h6">
          No canceled bookings found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {canceledBookings.map((booking, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  backgroundColor: "white",
                  padding: 2,
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Booking ID: {booking._id}
                  </Typography>
                  <Typography>
                    <strong>User:</strong> {booking.user?.name} (
                    {booking.user?.contact})
                  </Typography>
                  <Typography>
                    <strong>Car:</strong> {booking.car?.carModel} (
                    {booking.car?.carType}, {booking.car?.carTier})
                  </Typography>
                  <Typography>
                    <strong>Rent/Day:</strong> ₹{booking.car?.rentPerDay}
                  </Typography>
                  <Typography>
                    <strong>From:</strong> {booking.fromDate}
                  </Typography>
                  <Typography>
                    <strong>To:</strong> {booking.toDate}
                  </Typography>
                  <Typography color="red" fontWeight="bold">
                    Status: {booking.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default AdminCancel;
