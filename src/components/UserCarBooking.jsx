import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CarBookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCar, formData } = location.state || {};

  const [pickupDistance, setPickupDistance] = useState(0);
  const [dropoffDistance, setDropoffDistance] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    if (formData?.fromDate && formData?.toDate) {
      const start = new Date(formData.fromDate);
      const end = new Date(formData.toDate);
      const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
      setNumberOfDays(days);
    }
  }, [formData]);

  useEffect(() => {
    const delivery = pickupDistance * 8 + dropoffDistance * 8;
    let price = selectedCar?.pricePerDay * numberOfDays + delivery;

    let discount = selectedOffer ? (selectedOffer.discountPercentage / 100) * (selectedCar?.pricePerDay * numberOfDays) : 0;

    setDeliveryCharge(delivery);
    setDiscountAmount(discount);
    setTotalPrice(Math.max(0, price - discount));
  }, [pickupDistance, dropoffDistance, numberOfDays, selectedCar, selectedOffer]);

  // Fetch available offers using fetch
  useEffect(() => {
    fetch("http://localhost:3000/offers/active") // Replace with your actual API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch offers");
        }
        return response.json();
      })
      .then(data => {
        setOffers(data);
      })
      .catch(error => {
        console.error("Error fetching offers:", error);
      });
  }, []);

  const handleProceedToPayment = () => {
    navigate("/userpayment", {
      state: {
        selectedCar,
        formData,
        pickupDistance,
        dropoffDistance,
        numberOfDays,
        totalPrice,
        deliveryCharge,
        discountAmount,
        selectedOfferId: selectedOffer ? selectedOffer._id : null,
        paymentCompleted: false,
      },
    });
  };

  return (
    <div style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Confirm Your Booking</h2>

      {/* Car Details */}
      <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px", marginBottom: "16px", backgroundColor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "600" }}>{selectedCar?.carModel}</h3>
        <p><strong>Type:</strong> {selectedCar?.carType}</p>
        <p><strong>Transmission:</strong> {selectedCar?.transmissionType}</p>
        <p><strong>Fuel:</strong> {selectedCar?.fuelType}</p>
        <p><strong>Seats:</strong> {selectedCar?.seatCapacity}</p>
        <p><strong>Price/Day:</strong> ₹{selectedCar?.pricePerDay}</p>
      </div>

      {/* Booking Details */}
      <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px", marginBottom: "16px", backgroundColor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <p><strong>From Date:</strong> {formData?.fromDate}</p>
        <p><strong>To Date:</strong> {formData?.toDate}</p>
        <p><strong>Number of Days:</strong> {numberOfDays}</p>

        <div style={{ marginTop: "16px" }}>
          <label>Pickup Distance (km): </label>
          <input
            type="number"
            value={pickupDistance}
            onChange={(e) => setPickupDistance(Number(e.target.value))}
            style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "6px", marginLeft: "8px", width: "100px" }}
          />
        </div>

        <div style={{ marginTop: "12px" }}>
          <label>Drop-off Distance (km): </label>
          <input
            type="number"
            value={dropoffDistance}
            onChange={(e) => setDropoffDistance(Number(e.target.value))}
            style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "6px", marginLeft: "8px", width: "100px" }}
          />
        </div>

        {/* Offer Selection */}
        <div style={{ marginTop: "16px" }}>
          <label>Apply Offer: </label>
          <select
            onChange={(e) => {
              const selected = offers.find(offer => offer._id === e.target.value);
              setSelectedOffer(selected);
            }}
            style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "6px", marginLeft: "8px", width: "200px" }}
          >
            <option value="">-- Select Offer --</option>
            {offers.map((offer) => (
              <option key={offer._id} value={offer._id}>
                {offer.name} - {offer.discountPercentage}% Off
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: "16px" }}>
          <p><strong>Delivery Charge:</strong> ₹{deliveryCharge}</p>
          <p><strong>Discount:</strong> -₹{discountAmount.toFixed(2)}</p>
          <p><strong>Total Price:</strong> ₹{totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <button
        onClick={handleProceedToPayment}
        style={{
          backgroundColor: "#16a34a",
          color: "white",
          padding: "10px 16px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "16px"
        }}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default CarBookingPage;
