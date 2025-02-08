import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return new Response(JSON.stringify({ token, message: 'Login successful' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
