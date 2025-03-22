import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Column specific widths
const columnStyles = {
  bookingId: { width: "180px" },
  userName: { width: "120px" },
  contact: { width: "120px" },
  carModel: { width: "160px" },
  fromDate: { width: "120px" },
  toDate: { width: "120px" },
  price: { width: "100px" },
  payment: { width: "140px" },
  actions: { width: "180px" },
};

// General table styles
const styles = {
  th: {
    padding: "5px",
    border: "1px solid #ddd",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  td: {
    padding: "8px",
    border: "1px solid #ddd",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
  },
  tr: {
    backgroundColor: "#fff",
  },
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch bookings and their payment status
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:3000/booking/all");
        if (response.status === 404) {
          setBookings([]);
          setLoading(false);
          return;
        }
        if (!response.ok) throw new Error("Failed to fetch bookings");

        const data = await response.json();

        if (data.length === 0) {
          setBookings([]);
          setLoading(false);
          return;
        }

        // Fetch payment status for each booking
        const bookingsWithPayments = await Promise.all(
          data.map(async (booking) => {
            try {
              const paymentResponse = await fetch(
                `http://localhost:3000/payment/booking/${booking._id}`
              );
              if (!paymentResponse.ok) throw new Error("Payment not found");
              const paymentData = await paymentResponse.json();
              return { ...booking, paymentStatus: paymentData.paymentStatus };
            } catch {
              return { ...booking, paymentStatus: "Not Available" };
            }
          })
        );

        setBookings(bookingsWithPayments);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleBack = () => navigate("/admin/dashboard");

  // Handler for Update (navigation to update page)
  const handleOpenUpdate = (booking) => {
    navigate(`/admin/update-booking/${booking._id}`);
  };

  // Handler for Cancel Booking
  const handleCancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const response = await fetch(`http://localhost:3000/booking/cancel/${id}`, {
        method: "PUT",
      });
      if (!response.ok) throw new Error("Failed to cancel booking");
      alert("Booking cancelled successfully!");
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Final return for loading/error state
  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/qdrive.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        padding: "50px 10px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <button
          onClick={handleBack}
          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ← Back to Dashboard
        </button>

        <h2 style={{ textAlign: "center", padding: "20px" }}>Booking Details</h2>

        {bookings.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px", color: "gray" }}>
            No Bookings Found
          </p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "14px",
              backgroundColor: "#f9f9f9",
              tableLayout: "fixed",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#333", color: "#fff" }}>
                <th style={{ ...styles.th, ...columnStyles.bookingId }}>Booking ID</th>
                <th style={{ ...styles.th, ...columnStyles.userName }}>User Name</th>
                <th style={{ ...styles.th, ...columnStyles.contact }}>Contact</th>
                <th style={{ ...styles.th, ...columnStyles.carModel }}>Car Model</th>
                <th style={{ ...styles.th, ...columnStyles.fromDate }}>From</th>
                <th style={{ ...styles.th, ...columnStyles.toDate }}>To</th>
                <th style={{ ...styles.th, ...columnStyles.price }}>Price</th>
                <th style={{ ...styles.th, ...columnStyles.payment }}>Payment</th>
                <th style={{ ...styles.th, ...columnStyles.actions }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} style={styles.tr}>
                  <td style={{ ...styles.td, ...columnStyles.bookingId }}>{booking._id}</td>
                  <td style={{ ...styles.td, ...columnStyles.userName }}>{booking.user?.name || "N/A"}</td>
                  <td style={{ ...styles.td, ...columnStyles.contact }}>{booking.user?.phone || "N/A"}</td>
                  <td style={{ ...styles.td, ...columnStyles.carModel }}>{booking.car?.carModel || "Unknown"}</td>
                  <td style={{ ...styles.td, ...columnStyles.fromDate }}>{new Date(booking.fromDate).toLocaleDateString()}</td>
                  <td style={{ ...styles.td, ...columnStyles.toDate }}>{new Date(booking.toDate).toLocaleDateString()}</td>
                  <td style={{ ...styles.td, ...columnStyles.price }}>${booking.totalPrice.toFixed(2)}</td>
                  <td style={{ ...styles.td, ...columnStyles.payment }}>{booking.paymentStatus}</td>
                  <td style={{ ...styles.td, ...columnStyles.actions }}>
                    <button
                      onClick={() => handleOpenUpdate(booking)}
                      style={{
                        padding: "5px 10px",
                        marginRight: "5px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
