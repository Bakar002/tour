import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const AddEditFlightForm = ({ flight, closeModal, refreshFlights }) => {
  const [formData, setFormData] = useState({
    flightId: "",
    companyLogoUrl: "",
    departure: { date: "", airport: "", terminal: "", time: "" },
    arrival: { date: "", airport: "", terminal: "", time: "" },
    price: { adult: 0, child: 0 },
    mealIncluded: false,
    luggageKg: "", // Change luggageKg to string
    availableSeats: 0,
  });

  useEffect(() => {
    if (flight) {
      setFormData({
        ...flight,
        departure: { ...flight.departure },
        arrival: { ...flight.arrival },
        price: { ...flight.price },
      });
    }
  }, [flight]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields (departure and arrival)
    if (name.startsWith("departure") || name.startsWith("arrival")) {
      const [section, field] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: value,
        },
      }));
    } else if (name.startsWith("price")) {
      // Handle price (adult and child)
      const [_, field] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        price: {
          ...prevData.price,
          [field]: value,
        },
      }));
    } else {
      // Handle other fields
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to be sent to the backend
    const flightData = {
      flightId: formData.flightId,
      companyLogoUrl: formData.companyLogoUrl,
      departure: formData.departure,
      arrival: formData.arrival,
      price: formData.price,
      mealIncluded: formData.mealIncluded,
      luggageKg: formData.luggageKg,
      availableSeats: formData.availableSeats,
    };

    try {
      let response;
      // Check if the form is for adding or editing
      if (flight) {
        // Update the existing flight
        response = await fetch(`/api/flights/${flight._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flightData),
        });
      } else {
        // Add new flight
        response = await fetch("/api/flights/addflight", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flightData),
        });
      }

      if (response.ok) {
        refreshFlights(); // Refresh flight list
        closeModal(); // Close the modal
        alert(flight ? "Flight updated successfully!" : "Flight added successfully!");
      } else {
        alert("Error saving flight. Please try again.");
      }
    } catch (error) {
      alert("Error saving flight. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 overflow-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add / Edit Flight</h2>
          <button onClick={closeModal}>
            <FaTimes className="text-xl text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="space-y-4">
            {/* Flight ID */}
            <div>
              <label htmlFor="flightId" className="block text-sm font-medium text-gray-700">
                Flight ID
              </label>
              <input
                type="text"
                id="flightId"
                name="flightId"
                value={formData.flightId}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                required
              />
            </div>

            {/* Company Logo URL */}
            <div>
              <label htmlFor="companyLogoUrl" className="block text-sm font-medium text-gray-700">
                Company Logo URL
              </label>
              <input
                type="text"
                id="companyLogoUrl"
                name="companyLogoUrl"
                value={formData.companyLogoUrl}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                required
              />
            </div>

            {/* Departure - three inputs in a row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="departure.date" className="block text-sm font-medium text-gray-700">
                  Departure Date
                </label>
                <input
                  type="date"
                  id="departure.date"
                  name="departure.date"
                  value={formData.departure.date}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="departure.airport" className="block text-sm font-medium text-gray-700">
                  Departure Airport
                </label>
                <input
                  type="text"
                  id="departure.airport"
                  name="departure.airport"
                  value={formData.departure.airport}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="departure.terminal" className="block text-sm font-medium text-gray-700">
                  Departure Terminal
                </label>
                <input
                  type="text"
                  id="departure.terminal"
                  name="departure.terminal"
                  value={formData.departure.terminal}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                  required
                />
              </div>
            </div>

            {/* Arrival - three inputs in a row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="arrival.date" className="block text-sm font-medium text-gray-700">
                  Arrival Date
                </label>
                <input
                  type="date"
                  id="arrival.date"
                  name="arrival.date"
                  value={formData.arrival.date}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="arrival.airport" className="block text-sm font-medium text-gray-700">
                  Arrival Airport
                </label>
                <input
                  type="text"
                  id="arrival.airport"
                  name="arrival.airport"
                  value={formData.arrival.airport}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="arrival.terminal" className="block text-sm font-medium text-gray-700">
                  Arrival Terminal
                </label>
                <input
                  type="text"
                  id="arrival.terminal"
                  name="arrival.terminal"
                  value={formData.arrival.terminal}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                  required
                />
              </div>
            </div>

            {/* Departure and Arrival Time - two inputs in a row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="departure.time" className="block text-sm font-medium text-gray-700">
                  Departure Time
                </label>
                <input
                  type="time"
                  id="departure.time"
                  name="departure.time"
                  value={formData.departure.time}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="arrival.time" className="block text-sm font-medium text-gray-700">
                  Arrival Time
                </label>
                <input
                  type="time"
                  id="arrival.time"
                  name="arrival.time"
                  value={formData.arrival.time}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                  required
                />
              </div>
            </div>

            {/* Prices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price.adult" className="block text-sm font-medium text-gray-700">
                  Adult Price
                </label>
                <input
                  type="number"
                  id="price.adult"
                  name="price.adult"
                  value={formData.price.adult}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="price.child" className="block text-sm font-medium text-gray-700">
                  Child Price
                </label>
                <input
                  type="number"
                  id="price.child"
                  name="price.child"
                  value={formData.price.child}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                  required
                />
              </div>
            </div>

            {/* Meal Included */}
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="mealIncluded"
                  checked={formData.mealIncluded}
                  onChange={(e) => setFormData({ ...formData, mealIncluded: e.target.checked })}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span className="ml-2 text-sm text-gray-700">Meal Included</span>
              </label>
            </div>

            {/* Luggage Weight */}
            <div>
              <label htmlFor="luggageKg" className="block text-sm font-medium text-gray-700">
                Luggage Weight (kg)
              </label>
              <input
                type="text"
                id="luggageKg"
                name="luggageKg"
                value={formData.luggageKg}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                required
              />
            </div>

            {/* Available Seats */}
            <div>
              <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-700">
                Available Seats
              </label>
              <input
                type="number"
                id="availableSeats"
                name="availableSeats"
                value={formData.availableSeats}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                required
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md"
            >
              Save Flight
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditFlightForm;
