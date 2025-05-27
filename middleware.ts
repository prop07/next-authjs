import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const path = req.nextUrl.pathname;
  const res = NextResponse.next();

  if (session?.expires !== "hello" && path === "/create") {
    // If session is not valid and path is '/user', redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Set custom header with full URL
  res.headers.set("path", path);

  return res;
}

// Apply middleware to all paths or specific paths
export const config = {
  matcher: "/:path*", // all routes
};
