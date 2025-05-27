import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id_token } = await request.json();
  const res = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`
  );
  const data = await res.json();
  if (data.email) {
    const user = {
      id: data.sub,
      name: data.name,
      email: data.email,
      image: data.picture,
      expiresAt: new Date(Date.now() + 60 * 1 * 1000).toISOString(),
    };

    return NextResponse.json({ success: true, user });
  }

  return NextResponse.json(
    { success: false, message: "Missing Google email" },
    { status: 400 }
  );
}
