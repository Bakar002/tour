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
      const [_, field] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        price: {
          ...prevData.price,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send to the backend (API or mock API call)
    const payload = {
      flightId: formData.flightId,
      companyLogoUrl: formData.companyLogoUrl,
      departure: {
        date: formData.departure.date,
        airport: formData.departure.airport,
        terminal: formData.departure.terminal,
        time: formData.departure.time,
      },
      arrival: {
        date: formData.arrival.date,
        airport: formData.arrival.airport,
        terminal: formData.arrival.terminal,
        time: formData.arrival.time,
      },
      price: {
        adult: formData.price.adult,
        child: formData.price.child,
      },
      mealIncluded: formData.mealIncluded,
      luggageKg: formData.luggageKg,
      availableSeats: formData.availableSeats,
    };

    try {
      if (flight) {
        // Edit existing flight (PUT or PATCH request)
        await fetch(`/api/flights/${formData.flightId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else {
        // Add new flight (POST request)
        await fetch("/api/flights/addflight", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      // Refresh the flight list and close modal
      refreshFlights();
      closeModal();
    } catch (error) {
      console.error("Error submitting flight:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 overflow-auto shadow-lg max-h-[90vh] flex flex-col space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Add / Edit Flight</h2>
          <button onClick={closeModal}>
            <FaTimes className="text-2xl text-gray-600 hover:text-gray-900 cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Departure Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Arrival Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Departure and Arrival Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Price Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Meal Included */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="mealIncluded"
              name="mealIncluded"
              checked={formData.mealIncluded}
              onChange={() => setFormData({ ...formData, mealIncluded: !formData.mealIncluded })}
              className="mr-3"
            />
            <label htmlFor="mealIncluded" className="text-sm text-gray-700">
              Meal Included
            </label>
          </div>


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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none"
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
