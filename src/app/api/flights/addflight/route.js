import dbConnect from '../../../../lib/dbConnect';
import Flight from '../../../../models/Flight';

export async function POST(req) {
  try {
    await dbConnect();
    const { flightId, companyLogoUrl, departure, arrival, price, mealIncluded, luggageKg, availableSeats } = await req.json();

    const newFlight = new Flight({
      flightId,
      companyLogoUrl,
      departure,
      arrival,
      price,
      mealIncluded,
      luggageKg,
      availableSeats,
    });

    await newFlight.save();

    return new Response(JSON.stringify({ message: 'Flight added successfully', flight: newFlight }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error adding flight' }), { status: 500 });
  }
}
