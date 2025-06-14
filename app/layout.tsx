import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { getMetadata } from "./metaData";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export async function generateMetadata(): Promise<Metadata> {
  const heads = await headers();
  const path = heads.get("path");
  const page = path?.split("/").filter(Boolean)[0] || "home";
  return getMetadata(page);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const heads = await headers();
  const token = JSON.parse(heads.get("token") || "{}");
  const exp = heads.get("tokenexpire");
  const expireDate = exp ? new Date(JSON.parse(exp) * 1000) : null;
  console.log("expireDate", expireDate);
  console.log("current date", new Date())

  if (expireDate && new Date() > expireDate) {
    console.log("Token expired, redirecting to login");
  }


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
