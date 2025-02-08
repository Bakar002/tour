'use client';

import { useState, useEffect } from 'react';
import AddEditFlightForm from './addEditForm'; // Add/Edit Form Component
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function AdminFlights() {
  const [flights, setFlights] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  // Fetch flights from API on initial load
  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    const response = await fetch('/api/flights/getflights');
    const data = await response.json();
    setFlights(data);
  };

  // Delete a flight
  const deleteFlight = async (id) => {
    const response = await fetch(`/api/flights/deleteflight/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setFlights(flights.filter(flight => flight._id !== id));
    } else {
      alert('Error deleting flight');
    }
  };

  // Open the modal for adding or editing a flight
  const openModal = (flight = null) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Manage Flights</h2>
      
      {/* Add Flight Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => openModal()}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Flight
        </button>
      </div>

      {/* Flights Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Flight ID</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Company</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Departure</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Arrival</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Price</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Seats</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map(flight => (
              <tr key={flight._id}>
                <td className="py-3 px-4 text-sm text-gray-800">{flight.flightId}</td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  <img src={flight.companyLogoUrl} alt={flight.company} className="w-16 h-16 object-contain" />
                </td>
<td className="py-3 px-4 text-sm text-gray-600">
  {new Date(flight.departure.date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })} 
  <span className="text-gray-500"> at {flight.departure.time}</span>
</td>
<td className="py-3 px-4 text-sm text-gray-600">
  {new Date(flight.arrival.date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })} 
  <span className="text-gray-500"> at {flight.arrival.time}</span>
</td>

                <td className="py-3 px-4 text-sm text-gray-600">Adult:{flight.price.adult}Rs / Child:{flight.price.child}Rs</td>
                <td className="py-3 px-4 text-sm text-gray-600">{flight.availableSeats}</td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  <button
                    onClick={() => openModal(flight)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md mr-2 hover:bg-yellow-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteFlight(flight._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Flight */}
      {isModalOpen && (
        <AddEditFlightForm
          flight={selectedFlight}
          closeModal={() => setIsModalOpen(false)}
          refreshFlights={fetchFlights}
        />
      )}
    </div>
  );
}
