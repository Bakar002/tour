import dbConnect from '../../../../lib/dbConnect';
import Flight from '../../../../models/Flight';

export async function GET(req) {
  try {
    await dbConnect();
    const flights = await Flight.find();
    return new Response(JSON.stringify(flights), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching flights' }), { status: 500 });
  }
}
