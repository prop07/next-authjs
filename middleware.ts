import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const res = NextResponse.next();

  // Set custom header with full URL
  res.headers.set("path", path);

  return res;
}

// Apply middleware to all paths or specific paths
export const config = {
  matcher: "/:path*", // all routes
};
