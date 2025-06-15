import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const res = NextResponse.next();
  res.headers.set("path", path);

  if (path === "/dashboard") {
    const authToken = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
    });

    if (!authToken?.id) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const decodedToken = jwt.decode(authToken.id as string) as {
      exp?: number;
    } | null;

    if (
      !decodedToken ||
      (decodedToken.exp && Date.now() / 1000 > decodedToken.exp)
    ) {
      const message = {
        status: "error",
        message: "Session expired. Please login again",
      };
      const encodedmessage = btoa(JSON.stringify(message));
      return NextResponse.redirect(
        new URL(`/login?token=${encodedmessage}`, req.url)
      );
    }

    res.headers.set("token", JSON.stringify(decodedToken));
  }

  return res;
}

export const config = {
  matcher: ["/dashboard"],
};
