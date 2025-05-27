import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const res = NextResponse.next();
  res.headers.set("path", path);
  const token = await getToken({
    req: req,
    secret: process.env.AUTH_SECRET,
  });
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (token.loginExpiredAt && new Date(token.loginExpiredAt) < new Date()) {
    let encoded;
    const result = {
      status: "error",
      message: "Session expired.Please login again",
    };
    encoded = btoa(JSON.stringify(result));

    return NextResponse.redirect(new URL(`/login?token=${encoded}`, req.url));
  }

  return res;
}

// Apply middleware to all paths or specific paths
export const config = {
  matcher: "/create:path*", // all routes
};
