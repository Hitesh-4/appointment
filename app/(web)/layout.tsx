import { auth, currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next"; 
import Home from "../page";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
  
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
      return (
      <main>
        <div className=" px-2 mt-10 max-md:px-2 max-lg:px-3">
        {children}
        <Footer />
        </div>
      </main>
  ); 
  }
   
