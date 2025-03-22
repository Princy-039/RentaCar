import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AvailableCars = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Getting form data (if any from previous page)
  const { formData } = location.state || {};
  const [fromDate, setFromDate] = useState(formData?.fromDate || '');
  const [toDate, setToDate] = useState(formData?.toDate || '');
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  // Auto-fetch cars if formData was passed
  useEffect(() => {
    if (fromDate && toDate) {
      fetchAvailableCars();
    }
  }, []);

  // Fetch Available Cars
  const fetchAvailableCars = async (e) => {
    if (e) e.preventDefault();

    // Basic date validation
    if (!fromDate || !toDate) {
      setError('Please select both From Date and To Date');
      setCars([]);
      return;
    }
    if (fromDate > toDate) {
      setError('"To Date" must be later than "From Date"');
      setCars([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `http://localhost:3000/cars/available?fromDate=${fromDate}&toDate=${toDate}`
      );
      const data = await response.json();

      if (response.ok) {
        setCars(data.availableCars);
        if (data.availableCars.length === 0) {
          setError('No cars available for the selected dates.');
        }
      } else {
        setError(data.message || 'Failed to fetch available cars');
      }
    } catch (err) {
      setError('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  // Handle Booking Navigation
  const handleSelectCar = (car) => {
    const bookingData = { selectedCar: car, formData: { fromDate, toDate } };
    navigate('/user/book-car', { state: bookingData });
  };

  const handleBackToDashboard = () => navigate('/user/dashboard');

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '40px 20px',
        backgroundImage: "url('/qdrive.png')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Available Cars</h2>
        <button
          onClick={handleBackToDashboard}
          style={{
            backgroundColor: '#2563EB',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 0' }}>
        {/* Search Form */}
        <form
          onSubmit={fetchAvailableCars}
          style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            margin: '0 auto 32px',
            maxWidth: '800px'
          }}
        >
          <h3 style={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', marginBottom: '16px' }}>
            Find Available Cars
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontWeight: '600' }}>From Date</label>
              <input
                type="date"
                min={today}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid gray' }}
              />
            </div>
            <div>
              <label style={{ fontWeight: '600' }}>To Date</label>
              <input
                type="date"
                min={today}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid gray' }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#16A34A',
              color: 'white',
              padding: '12px',
              width: '100%',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Search Cars
          </button>
        </form>

        {/* Feedback */}
        {loading && <p style={{ textAlign: 'center', fontWeight: '500' }}>Loading available cars...</p>}
        {error && <p style={{ textAlign: 'center', color: 'red', fontWeight: '600' }}>{error}</p>}

        {/* Cars Display */}
        {!loading && cars.length > 0 && (
          <div style={{ maxWidth: '1100px', margin: 'auto' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
              {cars.length} Cars Available
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {cars.map((car) => (
                <div
                  key={car._id}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    backgroundColor: 'white'
                  }}
                >
                  <img src={`http://localhost:3000/${car.carImage}`} alt={car.carModel}
                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '16px', fontSize: '14px' }}>
                    <h4 style={{ fontWeight: 'bold', fontSize: '16px' }}>{car.carModel}</h4>
                    <p><strong>Number:</strong> {car.carNumber}</p>
                    <p><strong>Type:</strong> {car.carType}</p>
                    <p><strong>Tier:</strong> {car.carTier}</p>
                    <p><strong>Transmission:</strong> {car.transmissionType}</p>
                    <p><strong>Fuel:</strong> {car.fuelType}</p>
                    <p><strong>Seats:</strong> {car.seatCapacity}</p>
                    <p><strong>Price/Day:</strong> ₹{car.pricePerDay}</p>
                  </div>
                  <button
                    onClick={() => handleSelectCar(car)}
                    style={{
                      backgroundColor: '#2563EB',
                      color: 'white',
                      padding: '12px',
                      width: '100%',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Select & Book
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableCars;
