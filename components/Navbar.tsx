'use client'
import Link from "next/link"; 
import { SignedIn,SignedOut,UserButton,useUser} from '@clerk/nextjs' 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
 
 
function Navbar() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;
  const router = useRouter();
  useEffect(() => {
    const role = user?.publicMetadata.role; 
    if (role==='admin') {
      router.push(`/admin`);
    }
  }, [user, router]);
  
  const [open ,setOpen] = useState(false)
  return (
    <div className=" h-[60px] rounded-xl mt-4 mx-auto w-[96%] flex justify-between max-lg:px-3 px-10 items-center bg-[#f588ffc9] ">
      <Link href={'/'} className=" text-gray-300 text-4xl max-sm:text-xl max-lg:text-2xl font-bold ">Appointment-Hub</Link>
      <div className=" items-center gap-4 flex">
        {
         user && role === 'admin'  ? (  <Link className="max-md:hidden border-2  border-[#ffffff57] inshadow max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg "  href={"/admin"}>admin</Link> ): 
         ( user && <>
         <Link className=" max-md:hidden   hover:bg-blue-500 transition-all footer2  inshadow max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg "  href={"/appointment"}>Appointment</Link>
         <Link className=" max-md:hidden  border-2  border-[#ffffff57] inshadow max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg "  href={"/my-profile"}>My Profile</Link>
         </>
          )
        }
          <SignedOut> 
              <Link className=" border-2  border-[#ffffff57] inshadow max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg " href={'/sign-in'}>Sign-in</Link>
            </SignedOut>
            <SignedIn>
              <UserButton  />
            </SignedIn> 
            
         { user &&   <div className="relative hidden max-md:block bg-[#0000006c] rounded-lg  cursor-pointer group p-2">
              <h1 onClick={()=>setOpen(!open)} className="text-lg"> <TbLayoutSidebarLeftCollapse /> </h1>
              <div className={` ${open ? ' flex ' : ' hidden '} w-40 h-fit  backdrop-blur-lg bg-[#0000002b] p-3 -right-2 top-10 flex-col gap-3 rounded-xl absolute`}>
              {
         user && role === 'admin'  ? (  <Link className=" footer2 inshadow max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg "  href={"/admin"}>admin</Link> ): 
         ( user && <>
         <Link className=" footer2  inshadow max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg "  href={"/appointment"}>Appointment</Link>
         <Link className="  inshadow footer2 max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg "  href={"/my-profile"}>My Profile</Link>
         </>
          )
        }
              </div>
            </div>}


      </div>
    </div>
  );
}

export default Navbar;
