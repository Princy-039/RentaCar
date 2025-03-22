import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AvailableCars = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  // Function to fetch available cars for the date range
  const fetchAvailableCars = async () => {
    if (!fromDate || !toDate) {
      setError('Please select both From Date and To Date');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:3000/cars/available?fromDate=${fromDate}&toDate=${toDate}`);
      const data = await response.json();

      if (response.ok) {
        setCars(data.availableCars);
      } else {
        setError(data.message || 'Failed to fetch available cars');
      }
    } catch (err) {
      setError('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle navigation back to dashboard
  const handleBackToDashboard = () => {
    navigate('/admin/dashboard'); // Adjust path based on your routing
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/qdrive.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        padding: "50px 20px",
        position: "relative", // For positioning back button
      }}
    >
      {/* Back to Dashboard button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={handleBackToDashboard}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="p-4 max-w-4xl mx-auto bg-white bg-opacity-90 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Check Available Cars</h2>

        {/* Date Range Picker */}
        <div className="flex items-center gap-4 mb-6 justify-center">
          <div>
            <label className="block mb-1 font-medium">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
          </div>

          <button
            onClick={fetchAvailableCars}
            className="bg-green-500 text-white px-4 py-2 mt-6 rounded hover:bg-green-600"
          >
            Check Availability
          </button>
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Car List Table */}
        {cars.length > 0 && (
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Car Number</th>
                <th className="p-2 border">Model</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Tier</th>
                <th className="p-2 border">Price/Day</th>
                <th className="p-2 border">Fuel Type</th>
                <th className="p-2 border">Seats</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id} className="text-center">
                  <td className="p-2 border">{car.carNumber}</td>
                  <td className="p-2 border">{car.carModel}</td>
                  <td className="p-2 border">{car.carType}</td>
                  <td className="p-2 border">{car.carTier}</td>
                  <td className="p-2 border">{car.pricePerDay}</td>
                  <td className="p-2 border">{car.fuelType}</td>
                  <td className="p-2 border">{car.seatCapacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {cars.length === 0 && !loading && !error && (
          <p className="text-center">No available cars found for the selected date range.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableCars;
