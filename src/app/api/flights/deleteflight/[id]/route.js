import dbConnect from '../../../../../lib/dbConnect';
import Flight from '../../../../../models/Flight';

export async function DELETE(req, { params }) {
  try {
    const { id } = params; // Extract the flight ID from the URL parameters

    await dbConnect();

    // Attempt to find and delete the flight by its ID
    const deletedFlight = await Flight.findByIdAndDelete(id);

    if (!deletedFlight) {
      // If the flight wasn't found, return a 404 error
      return new Response(JSON.stringify({ message: 'Flight not found' }), { status: 404 });
    }

    // If the flight was deleted successfully, return a success message
    return new Response(JSON.stringify({ message: 'Flight deleted successfully' }), { status: 200 });
  } catch (error) {
    // If there's any error, return a 500 server error
    return new Response(JSON.stringify({ message: 'Error deleting flight' }), { status: 500 });
  }
}
