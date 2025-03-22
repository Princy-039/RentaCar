import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract all values from location.state
  const {
    bookingId,
    carModel,  
    fromDate,  
    toDate,    
    numberOfDays,
    totalPrice, 
    discountAmount,
    paymentMethod,
    advancePayment,
    balanceAmount,
    offerApplied,  
    selectedOfferId, 
  } = location.state || {};

  console.log("Location state:", location.state); // Log the entire location state for debugging

  // Handle the case when state is not passed
  if (!location.state) {
    navigate('/booking'); // Redirect if no state is found
    return <p>Redirecting to booking page...</p>;
  }

  // Fallback for missing offer data
  const offerAppliedText = offerApplied !== undefined ? offerApplied : "No offer applied";
  const selectedOfferIdText = selectedOfferId !== undefined ? selectedOfferId : "N/A";

  const days = numberOfDays || "N/A";
  const price = totalPrice ? `₹${totalPrice}` : "₹N/A";
  const discount = discountAmount > 0 ? `₹${discountAmount}` : "₹N/A";
  const advance = advancePayment ? `₹${advancePayment}` : "₹N/A";
  const balance = balanceAmount ? `₹${balanceAmount}` : "₹N/A";

  const downloadReceipt = () => {
    try {
      const receiptData = `
        Booking ID: ${bookingId || "N/A"}
        Car: ${carModel || "N/A"}
        From: ${fromDate || "N/A"}
        To: ${toDate || "N/A"}
        Days: ${days}
        Total Price: ${price}
        Discount: ${discount}
        Payment Method: ${paymentMethod || "N/A"}
        Advance Paid: ${advance}
        Balance: ${balance}
        Status: Confirmed
        Offer Applied: ${offerAppliedText}
        Selected Offer ID: ${selectedOfferIdText}
      `;
      const blob = new Blob([receiptData], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Booking_Receipt_${bookingId}.txt`;
      link.click();
    } catch (error) {
      console.error("Error downloading receipt:", error);
      alert("There was an error generating the receipt. Please try again.");
    }
  };

  // Navigate to the dashboard page (or any other page you desire)
  const navigateToDashboard = () => {
    navigate('/dashboard'); // Update this path to your actual dashboard route
  };

  // Inline styles
  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#333',
  };

  const paragraphStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#555',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  };

  const primaryButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const secondaryButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Booking Confirmation</h2>
      <p style={paragraphStyle}><b>Booking ID:</b> {bookingId || "N/A"}</p>
      <p style={paragraphStyle}><b>Car:</b> {carModel || "N/A"}</p>
      <p style={paragraphStyle}><b>From:</b> {fromDate || "N/A"}</p>
      <p style={paragraphStyle}><b>To:</b> {toDate || "N/A"}</p>
      <p style={paragraphStyle}><b>Days:</b> {days}</p>
      <p style={paragraphStyle}><b>Total Price:</b> {price}</p>
      {discountAmount > 0 && <p style={paragraphStyle}><b>Discount Applied:</b> {discount}</p>}
      <p style={paragraphStyle}><b>Payment Method:</b> {paymentMethod || "N/A"}</p>
      <p style={paragraphStyle}><b>Advance Paid:</b> {advance}</p>
      <p style={paragraphStyle}><b>Balance to be Paid:</b> {balance}</p>
      <p style={paragraphStyle}><b>Status:</b> Confirmed</p>
      {/* <p style={paragraphStyle}><b>Offer Applied:</b> {offerAppliedText}</p> */}
      <p style={paragraphStyle}><b>Selected Offer ID:</b> {selectedOfferIdText}</p>

      <div style={buttonContainerStyle}>
        <button onClick={downloadReceipt} style={primaryButtonStyle}>Download Receipt</button>
        <button onClick={navigateToDashboard} style={secondaryButtonStyle}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
