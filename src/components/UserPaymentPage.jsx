import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Alert, Row, Col, Modal, Form } from 'react-bootstrap';
import { Check } from 'lucide-react';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("Received state in payment page:", location.state);

  // Destructuring selectedOfferId from location.state
  const {
    selectedCar = {},
    formData = {},
    pickupDistance = 0,
    dropoffDistance = 0,
    numberOfDays = 0,
    totalPrice = 0,
    deliveryCharge = 0,
    selectedOfferId = '', // Ensure selectedOfferId is destructured here
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('Online Payment');
  const [showModal, setShowModal] = useState(false);
  const [offers, setOffers] = useState([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [updatedTotalPrice, setUpdatedTotalPrice] = useState(totalPrice);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [offerApplied, setOfferApplied] = useState(false);
  const [loadingOffers, setLoadingOffers] = useState(true);

  const advancePayment = 1000;
  const balanceAmount = updatedTotalPrice - advancePayment;

  // Fetch offers only once
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:3000/offers/active');
        if (!response.ok) throw new Error('Failed to fetch offers');

        const data = await response.json();
        console.log('Fetched offers:', data);
        setOffers(data);
      } catch (error) {
        console.error('Error fetching offers:', error);
        alert('Error fetching offers. Please check your connection.');
      } finally {
        setLoadingOffers(false);
      }
    };
    fetchOffers();
  }, []);

  // Before applying the offer
  console.log("Offer before applying:", selectedOfferId);
  if (!selectedOfferId) {
    console.log("No offer selected.");
    return alert('Please select an offer to apply.');
  }

  // Handle applying offers
  const handleApplyOffer = () => {
    console.log("Selected offer ID:", selectedOfferId);
    if (!selectedOfferId) return alert('Please select an offer to apply.');
    if (offerApplied) return alert('Offer already applied.');

    const selectedOffer = offers.find((o) => o._id === selectedOfferId);
    console.log('Selected offer:', selectedOffer);
    if (!selectedOffer) return alert('Selected offer not found.');

    const discount = (totalPrice * selectedOffer.discountPercentage) / 100;
    setDiscountAmount(discount);
    setUpdatedTotalPrice(totalPrice - discount);
    setOfferApplied(true);

    console.log('Offer applied:', selectedOffer.title);
    alert(`Offer applied! You saved ₹${discount}. New total: ₹${totalPrice - discount}`);
  };

  // Handle payment confirmation
  const handleConfirmPayment = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please login to continue.');
      return navigate('/login');
    }

    // Prepare booking data
    const bookingPayload = {
      user: user._id,
      car: selectedCar._id,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      pickupDistance,
      dropoffDistance,
      selectedOfferId,  // Ensure selectedOfferId is included here
    };

    console.log("Final Booking Data before API call:", bookingPayload);

    try {
      // STEP 1: Create Booking
      const bookingResponse = await fetch('http://localhost:3000/booking/add', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // Ensure token is passed in the Authorization header
        },
        body: JSON.stringify(bookingPayload),
      });

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        throw new Error(errorData.error || 'Booking failed.');
      }

      const bookingData = await bookingResponse.json();
      const bookingId = bookingData._id || bookingData.booking?._id;
      if (!bookingId) throw new Error('Invalid booking response from server.');

      console.log('Booking ID:', bookingId);

      // STEP 2: Create Payment
      const paymentPayload = {
        amount: updatedTotalPrice,
        paymentMethod: paymentMethod === 'Online Payment' ? 'credit_card' : 'bank_transfer',
      };

      const paymentResponse = await fetch(`http://localhost:3000/payment/create/${bookingId}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // Ensure token is passed in the Authorization header
        },
        body: JSON.stringify(paymentPayload),
      });

      if (!paymentResponse.ok) {
        const paymentData = await paymentResponse.json();
        throw new Error(paymentData.error || 'Payment failed.');
      }

      console.log('Payment successful');

      // Fetch the updated booking to ensure offerApplied field is set correctly
      const updatedBookingResponse = await fetch(`http://localhost:3000/booking/me`, {
        headers: { 
          'Authorization': `Bearer ${user.token}`, // Ensure token is passed in the Authorization header
        },
      });
      if (!updatedBookingResponse.ok) {
        throw new Error('Failed to fetch updated booking.');
      }

      const updatedBookingData = await updatedBookingResponse.json();
      const { offerApplied: updatedOfferApplied } = updatedBookingData;

      console.log('Updated booking data:', updatedBookingData);

      setOfferApplied(updatedOfferApplied); // Update offerApplied with the backend value

      setPaymentCompleted(true);
      setShowModal(true);

      alert('Payment successful and booking confirmed!');
      navigate('/confirmation', {
        state: {
          bookingId,
          carModel: selectedCar.carModel,
          fromDate: formData.fromDate,
          toDate: formData.toDate,
          numberOfDays,
          totalPrice: updatedTotalPrice,
          discountAmount,
          paymentMethod,
          advancePayment,
          balanceAmount,
          paymentCompleted: true,
          offerApplied: updatedOfferApplied, // Pass updated offerApplied status here
          selectedOfferId,  // Pass selectedOfferId here as well
        },
      });
    } catch (error) {
      console.error('Error:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4>Payment & Booking Summary</h4>
            </Card.Header>
            <Card.Body>
              {selectedCar.carModel ? (
                <>
                  <Alert variant="info" className="text-center">
                    Please confirm your payment to proceed.
                  </Alert>

                  <Row>
                    <Col md={6}>
                      <h5>Car Details</h5>
                      <p><b>Car:</b> {selectedCar.carModel}</p>
                      <p><b>From:</b> {formData.fromDate}</p>
                      <p><b>To:</b> {formData.toDate}</p>
                      <p><b>Days:</b> {numberOfDays}</p>
                    </Col>
                    <Col md={6}>
                      <h5>Charges</h5>
                      <p><b>Pickup:</b> {pickupDistance} km</p>
                      <p><b>Drop-off:</b> {dropoffDistance} km</p>
                      <p><b>Delivery Charge:</b> ₹{deliveryCharge}</p>
                      <p><b>Total (Before Discount):</b> ₹{totalPrice}</p>
                      {offerApplied && <p><b>Discount Applied:</b> ₹{discountAmount}</p>}
                      <p><b>Final Price (After Discount):</b> ₹{updatedTotalPrice}</p>
                      <p><b>Advance Payment:</b> ₹{advancePayment}</p>
                      <p><b>Balance:</b> ₹{balanceAmount}</p>
                    </Col>
                  </Row>

                  <h5 className="mt-4">Payment Method</h5>
                  {['Online Payment', 'Cash on Delivery'].map((method) => (
                    <Form.Check
                      key={method}
                      label={method}
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                  ))}

                  <div className="d-flex justify-content-center gap-3 mt-4">
                    <Button variant="success" onClick={handleConfirmPayment}>
                      <Check className="me-2" /> Confirm Payment
                    </Button>
                  </div>
                </>
              ) : <Alert variant="danger">Booking details missing.</Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentPage;
