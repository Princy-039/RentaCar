import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SwitchedCarDetails = () => {
  const [switchedCars, setSwitchedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize navigation hook

  // Fetch switched car details from the API
  useEffect(() => {
    fetch('http://localhost:3000/booking/switched-cars')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch switched car details");
        }
        return response.json();
      })
      .then((data) => {
        setSwitchedCars(data.switchedCars);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Navigate back to Admin Dashboard
  const handleBackToDashboard = () => {
    navigate('/admin/dashboard'); // Update the route as per your route setup
  };

  // Render loading state
  if (loading) {
    return <p>Loading switched car details...</p>;
  }

  // Render error state
  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  // Render table of switched car details
  return (
    
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Switched Car Bookings</h2>

      <button
        onClick={handleBackToDashboard}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        ← Back to Dashboard
      </button>

      {switchedCars.length === 0 ? (
        <p>No switched car bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Booking ID</th>
                <th className="px-4 py-2 border border-gray-300">User Name</th>
                <th className="px-4 py-2 border border-gray-300">Email</th>
                <th className="px-4 py-2 border border-gray-300">Contact</th>
                <th className="px-4 py-2 border border-gray-300">From Date</th>
                <th className="px-4 py-2 border border-gray-300">To Date</th>
                <th className="px-4 py-2 border border-gray-300">Total Price</th>
                <th className="px-4 py-2 border border-gray-300">Discount</th>
                <th className="px-4 py-2 border border-gray-300">Delivery</th>
                <th className="px-4 py-2 border border-gray-300">Old Car</th>
                <th className="px-4 py-2 border border-gray-300">New Car</th>
              </tr>
            </thead>
            <tbody>
              {switchedCars.map((booking) => (
                <tr key={booking.bookingId} className="text-center">
                  <td className="px-4 py-2 border border-gray-300">{booking.bookingId}</td>
                  <td className="px-4 py-2 border border-gray-300">{booking.userName}</td>
                  <td className="px-4 py-2 border border-gray-300">{booking.userEmail}</td>
                  <td className="px-4 py-2 border border-gray-300">{booking.userContact}</td>
                  <td className="px-4 py-2 border border-gray-300">{booking.fromDate}</td>
                  <td className="px-4 py-2 border border-gray-300">{booking.toDate}</td>
                  <td className="px-4 py-2 border border-gray-300">{booking.totalPrice}</td>
                  <td className="px-4 py-2 border border-gray-300">{booking.discountAmount}</td>
                  <td className="px-4 py-2 border border-gray-300">{booking.deliveryCharge}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {booking.oldCar.carName} ({booking.oldCar.carType} - {booking.oldCar.carTier})
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {booking.newCar.carName} ({booking.newCar.carType} - {booking.newCar.carTier})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SwitchedCarDetails;
