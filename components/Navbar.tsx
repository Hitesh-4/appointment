"use client";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { GiAmbulance } from "react-icons/gi";
import { IoCall } from "react-icons/io5";
import { TbCalendarCheck } from "react-icons/tb";
import { FaPhoneAlt, FaTimes } from "react-icons/fa";

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
    { location: "Utkal Hospital", number: "+91 674 666 6600" },
    { location: "Apollo Hospital", number: "1066" },
    { location: "Kalinga Hospital", number: "1800 572 4000" },
    { location: "CARE Hospital", number: "0674-6165656" },
    { location: "AIIMS Bhubaneswar", number: "0674-2476461" },
    { location: "SUM Ultimate Medicare", number: "+91 0674 266 1111" },
    { location: "Sunshine Hospital", number: "+91 674 666 6600" },
    { location: "Manipal Hospital", number: "+91 0674 666 6600" },
    { location: "KIMS Hospital", number: "1800-309 8888" },
    {
      location: "S.C.B. Medical College & Hospital",
      number: "+91 975-1529-896",
    },
    {
      location: "Hi-Tech Medical College & Hospital",
      number: "+91 674 350 0900",
    },
    { location: "Capital Hospital", number: "+91 674 239 1983" },
    // { location: "Red Cross Hospital", number: "+91 674 2402389​" },
    // { location: "Salem", number: "080-22221117" },
    // { location: "Mysuru", number: "0821-3503500" },
    // { location: "Broadway", number: "033 2222 1111" },
  ];

  const [showModal, setShowModal] = useState(false); // Appointment modal state
  const [isOpen, setIsOpen] = useState(false); // Emergency modal state
  const [open, setOpen] = useState(false); // SignIn SignOut model state

  return (
    <div className=" h-[60px] rounded-xl mt-4 mx-auto w-[96%] flex justify-between max-lg:px-3 px-10 items-center bg-[#dcdfe845] ">
      <Link
        href={"/"}
        className=" text-blue-600 text-4xl max-sm:text-xl max-lg:text-2xl font-bold "
      >
        MediBook
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
              {/* Emergency Helpline  */}
              <div className="  relative text-white bg-red-700  hover:bg-red-800  flex gap-2 items-center justify-center  rounded-lg  text-l px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none ">
                <GiAmbulance className=" h-5 w-5" />
                <button onClick={() => setIsOpen(true)}>Emergency</button>

                {isOpen && (
                  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
                      {/* Close Button */}
                      <button
                        className="absolute top-4 right-4 text-gray-600 hover:text-black"
                        onClick={() => setIsOpen(false)}
                      >
                        <FaTimes size={20} />
                      </button>

                      {/* Header */}
                      <div className="flex  justify-center mb-6">
                        <div className="bg-red-600 text-white px-4 py-1 rounded-full flex items-center gap-2">
                          <h1>Emergency Contact Number</h1>
                          <span className="text-white text-sm font-semibold">
                            24/7
                          </span>
                        </div>
                      </div>
                      <p className=" bg-gray-100 text-gray-500 text-sm p-1 ">
                        For any emergency, please call the nearest hospital
                        number.
                      </p>

                      {/* Hospital Contact Grid */}
                      <div className="grid grid-cols-2 gap-4 p-4">
                        {emergencyContacts.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between border-b border-gray-200 pb-2"
                          >
                            <span className=" text-black">{item.location}</span>
                            <span className="text-gray-500">{item.number}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Appointment Helpline */}
              <div className="text-white  bg-blue-800 hover:bg-blue-900 font-medium rounded-lg text-l px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none flex gap-2 items-center justify-center cursor-pointer">
                <button
                  onClick={() => setShowModal(true)}
                  className=" flex items-center justify-center gap-2 transition"
                >
                  <IoCall className=" h-5 w-5" />
                  <h1>Appointement</h1>
                </button>

                {/* Modal */}
                {showModal && (
                  <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-xl relative border border-gray-300">
                      {/* Close icon */}
                      <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-black"
                        onClick={() => setShowModal(false)}
                      >
                        <FaTimes size={20} />
                      </button>

                      <h2 className="text-xl font-semibold mb-4 text-black">
                        {" "}
                        Appointment Helpline{" "}
                      </h2>
                      <hr className="mb-4" />
                      <div className="flex items-center justify-between text-blue-700 text-2xl font-bold">
                        <span>784 705 3348</span>
                        <FaPhoneAlt className="text-red-600" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Book Appointment  */}
              <Link
                className=" max-md:hidden   text-white  bg-blue-800 hover:bg-blue-900 font-medium rounded-lg text-l px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none flex gap-2 items-center justify-center cursor-pointer"
                href={"/appointment"}
              >
                <TbCalendarCheck className=" h-5 w-5" />
                Book Appointment
              </Link>

              {/* My Profile  */}
              <Link
                className=" max-md:hidden  border-2  border-[#7b6f6fed]  max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg  "
                href={"/my-profile"}
              >
                My Profile
              </Link>
            </>
          )
        )}
        <SignedOut>
          {/* Emergency Helpline  */}
          {/* Emergency Helpline  */}
          <div className="  relative text-white bg-red-700  hover:bg-red-800  flex gap-2 items-center justify-center  rounded-lg  text-l px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none ">
            <GiAmbulance className=" h-5 w-5" />
            <button onClick={() => setIsOpen(true)}>Emergency</button>

            {isOpen && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
                  {/* Close Button */}
                  <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-black"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaTimes size={20} />
                  </button>

                  {/* Header */}
                  <div className="flex  justify-center mb-6">
                    <div className="bg-red-600 text-white px-4 py-1 rounded-full flex items-center gap-2">
                      <h1>Emergency Contact Number</h1>
                      <span className="text-white text-sm font-semibold">
                        24/7
                      </span>
                    </div>
                  </div>
                  <p className=" bg-gray-100 text-gray-500 text-sm p-1 ">
                    For any emergency, please call the nearest hospital number.
                  </p>

                  {/* Hospital Contact Grid */}
                  <div className="grid grid-cols-2 gap-4 p-4">
                    {emergencyContacts.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between border-b border-gray-200 pb-2"
                      >
                        <span className=" text-black">{item.location}</span>
                        <span className="text-gray-500">{item.number}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Appointment Helpline */}
          <div className="text-white  bg-blue-800 hover:bg-blue-900 font-medium rounded-lg text-l px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none flex gap-2 items-center justify-center cursor-pointer">
            <button
              onClick={() => setShowModal(true)}
              className=" flex items-center justify-center gap-2 transition"
            >
              <IoCall className=" h-5 w-5" />
              <h1>Appointement</h1>
            </button>

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-xl relative border border-gray-300">
                  {/* Close icon */}
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                    onClick={() => setShowModal(false)}
                  >
                    <FaTimes size={20} />
                  </button>

                  <h2 className="text-xl font-semibold mb-4 text-black">
                    {" "}
                    Appointment Helpline{" "}
                  </h2>
                  <hr className="mb-4" />
                  <div className="flex items-center justify-between text-blue-700 text-2xl font-bold">
                    <span>784 705 3348</span>
                    <FaPhoneAlt className="text-red-600" />
                  </div>
                </div>
              </div>
            )}
          </div>
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
          <div className="relative hidden max-md:block bg-[#0000006c] rounded-lg  cursor-pointer group p-2 z-[100]">
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
                      className=" bg-blue-800  inshadow max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg "
                      href={"/appointment"}
                    >
                      <TbCalendarCheck className=" h-5 w-5" />
                      Book Appointment
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
