// app/api/auth/google-login/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, name, image, id } = await request.json();

  // Simulated user DB check/upsert

  if (email) {
    const user = {
      id: id,
      name: name,
      email: email,
      image: image,
      //   expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      expiresAt: "hola google login",
    };

    return NextResponse.json({ success: true, user });
  }

  return NextResponse.json(
    { success: false, message: "Missing Google email" },
    { status: 400 }
  );
}
