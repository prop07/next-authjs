import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.AUTH_SECRET;

export async function POST(request: Request) {
  const { id_token } = await request.json();
  const res = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`
  );
  const data = await res.json();
  if (data.email) {
    const payload = {
      name: data.name,
      email: data.email,
      image: data.picture,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1m" });
    return NextResponse.json({ success: true, token, user: { ...payload } });
  }
  if (!res.ok)
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 400 }
    );

  return NextResponse.json(
    { success: false, message: "Missing Google email" },
    { status: 400 }
  );
}
