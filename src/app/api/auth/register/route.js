// src/app/api/auth/register.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dbConnect from '../../../../lib/dbConnect';

import User from '../../../../models/User';

export async function POST(request) {
    try {
        await dbConnect();

        const { name, email, password, role } = await request.json();

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return new Response(
                JSON.stringify({ error: "User with this email already exists" }),
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return new Response(
            JSON.stringify({
                token,
                user: { name: newUser.name, email: newUser.email, role: newUser.role }
            }),
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: "Server Error" }),
            { status: 500 }
        );
    }
}
