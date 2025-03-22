// src/components/AdminPaymentDashboard.js
import React, { useState, useEffect } from 'react';

const AdminPaymentDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all payments on component mount
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:3000/payment/all');  // Use fetch instead of axios
        if (!response.ok) {
          throw new Error('Error fetching payments');
        }
        const data = await response.json();
        setPayments(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Update payment status function (Called when admin updates status)
  const updatePaymentStatus = async (paymentId, status) => {
    try {
      const response = await fetch(`http://localhost:3000/payment/status/${paymentId}`, {
        method: 'PUT', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Specify content type
        },
        body: JSON.stringify({ paymentStatus: status }), // Send data in body
      });

      if (!response.ok) {
        throw new Error('Error updating payment status');
      }

      const updatedPayment = await response.json();
      
      // Update state to reflect the changes
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment._id === updatedPayment.payment._id ? updatedPayment.payment : payment
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Admin Payment Dashboard</h1>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Payment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.bookingId._id}</td>
              <td>{payment.amount}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.paymentStatus}</td>
              <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
              <td>
                {payment.paymentStatus === 'pending' && (
                  <button className="btn btn-success" onClick={() => updatePaymentStatus(payment._id, 'completed')}>
                    Mark as Completed
                  </button>
                )}
                {payment.paymentStatus !== 'pending' && (
                  <button className="btn btn-danger" onClick={() => updatePaymentStatus(payment._id, 'failed')}>
                    Mark as Failed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPaymentDashboard;
