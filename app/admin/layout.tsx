import { auth, currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next"; 
import Home from "../page";
import { redirect } from "next/navigation";
 
export const metadata: Metadata = {
  title: "Admin | Appointments", 
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId: clerkUserId , sessionClaims } = await auth(); 
 
  console.log(sessionClaims)
  
  if(clerkUserId === 'user_2vJvDtH6WdjjXpMjQyFiBeINjTc'){
      return (
      <main>
        <div className=" px-20 mt-10 max-md:px-2 max-lg:px-3">
        {children}
        </div>
      </main>
  ); 
  }
  else{
    redirect('/');
  }
   
}
