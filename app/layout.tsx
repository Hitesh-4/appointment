import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Appointments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className=" relative ">
          <Navbar />
          {children}
          {/* <Footer /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
