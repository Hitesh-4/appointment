"use client";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { GiAmbulance } from "react-icons/gi";
import { IoCall } from "react-icons/io5";

function Navbar() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;
  const router = useRouter();
  useEffect(() => {
    const role = user?.publicMetadata.role;
    if (role === "admin") {
      router.push(`/admin`);
    }
  }, [user, router]);

  const emergencyContacts = [
    { location: "Utkal Hospital", number: "91 9090111144" },
    { location: "Apollo Hospital", number: "0674 6660666" },
    { location: "Kalinga Hospital", number: "1800 5725000" },
    { location: "CARE Hospital", number: "0674-6165656" },
    { location: "AIIMS Bhubaneswar", number: "0674-2476461" },
    { location: "SUM Ultimate Medicare", number: "0674 350 0500" },
    { location: "Sunshine Hospital", number: "0674-6669000" },
    { location: "Manipal Hospital", number: "0674-666 6666" },
    { location: "KIMS Hospital", number: "1800-309 8888" },
    // { location: "Patiala", number: "+91 975-1529-896" },
    // { location: "Jaipur", number: "+91900-133-3444" },
    // { location: "Goa", number: "+91 888-870-2222" },
    // { location: "Vijayawada", number: "0866-2222111" },
    // { location: "Salem", number: "080-22221117" },
    // { location: "Mysuru", number: "0821-3503500" },
    // { location: "Broadway", number: "033 2222 1111" },
  ];

  const [open, setOpen] = useState(false);
  return (
    <div className=" h-[60px] rounded-xl mt-4 mx-auto w-[96%] flex justify-between max-lg:px-3 px-10 items-center bg-[#091a5545] ">
      <Link
        href={"/"}
        className=" text-gray-300 text-4xl max-sm:text-xl max-lg:text-2xl font-bold "
      >
        We Care
      </Link>
      <div className=" items-center gap-4 flex">
        {user && role === "admin" ? (
          <Link
            className="max-md:hidden border-2  border-[#ffffff57] inshadow max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg "
            href={"/admin"}
          >
            admin
          </Link>
        ) : (
          user && (
            <>
              <div className=" group relative text-white bg-red-700  hover:bg-red-800 cursor-pointer flex gap-2 items-center justify-center  rounded-lg  text-l px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none ">
                <GiAmbulance className=" h-5 w-5" />
                <h1>Emergency </h1>
                <div className=" w-[900px] top-[50px] hidden  group-hover:block -left-[431%] h-[500px] mx-auto absolute z-10 bg-[#ffffff]   rounded-lg shadow-lg p-4">
                  <div className="bg-red-700 text-white text-lg font-bold p-3 flex items-center justify-center gap-5 pl-{100px} rounded-t-lg">
                    <h1>Emergency Contact Number</h1>
                    <span className="text-white text-sm font-semibold">
                      24/7
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-100 p-2 rounded-t-lg">
                    <span className="text-gray-500 text-sm font-semibold">
                      For any emergency, please call the nearest hospital
                      number.
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 p-4">
                    {emergencyContacts.map((contact, index) => (
                      <div
                        key={index}
                        className="flex justify-between border-b border-gray-200 pb-2"
                      >
                        <span className=" text-black">{contact.location}</span>
                        <span className="text-gray-500">{contact.number}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-white  bg-blue-800 hover:bg-blue-900 font-medium rounded-lg text-l px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none flex gap-2 items-center justify-center cursor-pointer">
                <IoCall className=" h-5 w-5" />
                <h1>Appointement</h1>
              </div>
              <Link
                className=" max-md:hidden   text-white  bg-blue-800 hover:bg-blue-900 font-medium rounded-lg text-l px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none flex gap-2 items-center justify-center cursor-pointer"
                href={"/appointment"}
              >
                Book Appointment
              </Link>
              <Link
                className=" max-md:hidden  border-2  border-[#ffffff57] inshadow max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg "
                href={"/my-profile"}
              >
                My Profile
              </Link>
            </>
          )
        )}
        <SignedOut>
          <Link
            className=" border-2  border-[#ffffff57] inshadow max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg "
            href={"/sign-in"}
          >
            Sign-in
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        {user && (
          <div className="relative hidden max-md:block bg-[#0000006c] rounded-lg  cursor-pointer group p-2">
            <h1 onClick={() => setOpen(!open)} className="text-lg">
              {" "}
              <TbLayoutSidebarLeftCollapse />{" "}
            </h1>
            <div
              className={` ${
                open ? " flex " : " hidden "
              } w-40 h-fit  backdrop-blur-lg bg-[#0000002b] p-3 -right-2 top-10 flex-col gap-3 rounded-xl absolute`}
            >
              {user && role === "admin" ? (
                <Link
                  className=" footer2 inshadow max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg "
                  href={"/admin"}
                >
                  admin
                </Link>
              ) : (
                user && (
                  <>
                    <Link
                      className=" footer2  inshadow max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg "
                      href={"/appointment"}
                    >
                      Appointment
                    </Link>
                    <Link
                      className="  inshadow footer2 max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg "
                      href={"/my-profile"}
                    >
                      My Profile
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
