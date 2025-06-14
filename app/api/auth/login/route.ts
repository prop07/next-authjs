import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.AUTH_SECRET;

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Simulated user data
  const mockUser = {
    email: "admin@gmail.com",
    password: "admin", // In real-world apps, never store plain passwords
    name: "John Doe",
    image:
      "https://www.shutterstock.com/image-vector/cute-chibi-anime-kawaii-girl-600nw-2319262633.jpg",
  };

  if (email === mockUser.email && password === mockUser.password) {
    const payload = {
      name: mockUser.name,
      email: mockUser.email,
      image: mockUser.image,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1m" });

    return NextResponse.json({ success: true, user: { ...payload, token } });
  }
  if (!email || !password)
    return NextResponse.json(
      { success: false, message: "Missing fields" },
      { status: 400 }
    );

  return NextResponse.json(
    { success: false, message: "Invalid email or password" },
    { status: 401 }
  );
}
