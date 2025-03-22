import React, { useEffect, useState } from 'react';
import { Table, Alert, Spinner } from 'react-bootstrap';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Ensure token retrieval is correct
        const response = await fetch("http://localhost:3000/payment/history", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setPayments(data); // ✅ Corrected this line

      } catch (error) {
        console.error("Failed to fetch payment history:", error);
        setError(error.message); // ✅ Store error message in state
      } finally {
        setLoading(false); // ✅ Ensure loading is set to false after fetch
      }
    };

    fetchPaymentHistory();
  }, []);

  return (
    <div className="container mt-5">
      <h3>Payment History</h3>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : payments.length === 0 ? (
        <Alert variant="info">No payment history available.</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Booking ID</th>
              <th>Total Price</th>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.bookingId?._id || "N/A"}</td>
                <td>₹{payment.bookingId?.totalPrice || "N/A"}</td>
                <td>{payment.bookingId?.from || "N/A"}</td>
                <td>{payment.bookingId?.to || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default PaymentHistory;
