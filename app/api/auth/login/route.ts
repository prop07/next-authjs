import { NextResponse } from "next/server";

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
    const user = {
      id: "1",
      name: mockUser.name,
      email: mockUser.email,
      image: mockUser.image,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour expiration,
    };

    return NextResponse.json({ success: true, user });
  }

  return NextResponse.json(
    { success: false, message: "Invalid email or password" },
    { status: 401 }
  );
}
