import React, { useState, useEffect } from 'react';

const UserCancelBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState("");

  const token = localStorage.getItem("authToken");

  // Fetch user bookings
  const fetchBookings = async () => {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch('http://localhost:3000/booking/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      console.log("Fetched bookings:", data); // Log bookings data

      if (!response.ok) throw new Error(data.message || "Failed to fetch bookings");
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel booking
  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    setCancellingId(bookingId);
    setMessage("");
    setError("");
    try {
      const response = await fetch(`http://localhost:3000/booking/cancel/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to cancel booking");

      setMessage("Booking canceled successfully.");
      fetchBookings(); // Refresh bookings after cancellation
    } catch (err) {
      console.error("Error cancelling booking:", err.message);
      setError(err.message);
    } finally {
      setCancellingId("");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h2>My Bookings</h2>

      {loading && <p>Loading bookings...</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && bookings.length === 0 && <p>No active bookings found.</p>}

      <div>
        {bookings.map((booking) => (
          <div
            key={booking._id}
            style={{
              margin: '15px 0',
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3>Booking Details</h3>
            <p><strong>Booking ID:</strong> {booking._id}</p>
            <p><strong>From Date:</strong> {new Date(booking.fromDate).toLocaleDateString()}</p>
            <p><strong>To Date:</strong> {new Date(booking.toDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> <span style={{ color: booking.status === 'cancelled' ? 'red' : 'green' }}>{booking.status}</span></p>

            {booking.car && (
              <>
                <h4>Car Details</h4>
                
                <p><strong>Model:</strong> {booking.car.carModel}</p>
                <p><strong>Price per day:</strong> ₹{booking.car.pricePerDay}</p>
                {booking.car.image && (
                  <div>
                     <img src={`http://localhost:3000/${car.carImage}`} alt={car.carModel}
                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                    />
                  </div>
                )}
              </>
            )}

            {booking.status !== 'cancelled' && (
              <button
                onClick={() => handleCancel(booking._id)}
                disabled={cancellingId === booking._id}
                style={{
                  marginTop: '15px',
                  backgroundColor: cancellingId === booking._id ? '#ccc' : '#e3342f',
                  color: '#fff',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: cancellingId === booking._id ? 'not-allowed' : 'pointer'
                }}
              >
                {cancellingId === booking._id ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCancelBooking;
