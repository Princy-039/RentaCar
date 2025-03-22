import React, { useState, useEffect } from 'react';

const SwitchCarFlow = () => {
  const [bookedCars, setBookedCars] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [confirmData, setConfirmData] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    if (authToken) {
      fetchBookings();
    } else {
      setError('User is not authenticated.');
    }
  }, [authToken]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/booking/${bookingId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookedCars(data);
    } catch (err) {
      setError('Failed to fetch bookings.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableCars = async (fromDate, toDate) => {
    setLoading(true);
    setAvailableCars([]);
    try {
      const response = await fetch(
        `http://localhost:3000/cars/available?fromDate=${fromDate}&toDate=${toDate}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      if (!response.ok) throw new Error('Failed to fetch available cars');
      const data = await response.json();
      setAvailableCars(data.availableCars);
    } catch (err) {
      setError('Failed to fetch available cars.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchCarClick = (booking) => {
    setSelectedBooking(booking);
    setMessage('');
    setError('');
    setConfirmData(null);
    fetchAvailableCars(booking.fromDate, booking.toDate);
  };

  const handleSelectCar = (car) => {
    setConfirmData({ car });
  };

  const confirmSwitch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/switch-car/${selectedBooking._id}/${confirmData.car._id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setMessage(data.message);
      fetchBookings();
      setConfirmData(null);
      setSelectedBooking(null);
    } catch (err) {
      setError('Failed to switch car');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Your Booked Cars</h2>
      {loading && <p>Loading...</p>}
      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}

      {bookedCars.length > 0 ? (
        bookedCars.map((booking) => (
          <div key={booking._id} className="card">
            <p><strong>Booking ID:</strong> {booking._id}</p>
            <p><strong>Car Model:</strong> {booking.car.carModel}</p>
            <p><strong>Rental Period:</strong> {new Date(booking.fromDate).toLocaleDateString()} - {new Date(booking.toDate).toLocaleDateString()}</p>
            <p><strong>Price:</strong> ${booking.totalPrice}</p>
            <button onClick={() => handleSwitchCarClick(booking)}>Switch Car</button>
          </div>
        ))
      ) : (
        !loading && <p>No cars booked.</p>
      )}

      {selectedBooking && (
        <div>
          <h3>Available Cars</h3>
          {availableCars.length > 0 ? (
            availableCars.map((car) => (
              <div key={car._id} className="card">
                <p><strong>Car Model:</strong> {car.carModel}</p>
                <button onClick={() => handleSelectCar(car)}>Select</button>
              </div>
            ))
          ) : (
            <p>No available cars for selected dates.</p>
          )}
        </div>
      )}

      {confirmData && (
        <div>
          <h3>Confirm Switch</h3>
          <p><strong>New Car Model:</strong> {confirmData.car.carModel}</p>
          <button onClick={confirmSwitch}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default SwitchCarFlow;
