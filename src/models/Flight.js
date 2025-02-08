import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema(
  {
    flightId: { type: String, required: true, unique: true }, // Unique Flight ID
    companyLogoUrl: { type: String, required: true }, // Company logo URL
    departure: {
      date: { type: Date, required: true },
      airport: { type: String, required: true },
      terminal: { type: String, required: true },
      time: { type: String, required: true },
    },
    arrival: {
      date: { type: Date, required: true },
      airport: { type: String, required: true },
      terminal: { type: String, required: true },
      time: { type: String, required: true },
    },
    price: {
      adult: { type: Number, required: true }, // Price for adult seats
      child: { type: Number, required: true }, // Price for child seats
    },
    mealIncluded: { type: Boolean, default: false }, // Meal inclusion
    luggageKg: { type: String, required: true }, // Luggage weight in kg
    availableSeats: { type: Number, required: true }, // Available seats
  },
  { timestamps: true }
);

const Flight = mongoose.models.Flight || mongoose.model('Flight', flightSchema);

export default Flight;
