//@ts-nocheck
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const DoctorSearch = () => {
  const [speciality, setSpeciality] = useState("");
  const [doctor, setDoctor] = useState("");
  const doctorsData = {
    "Dr. Sangeeta Agarwal": {
      image: "/doc1.jpg",
      qualification: "Dermatologist",
      location: "Manipal Hospital",
    },
    "Dr. R. K. Anand": {
      image: "/doc2.jpg",
      qualification: "Cardiology",
      location: "KIMS Hospital",
    },
    "Dr. Y. K. Amdekar": {
      image: "/doc3.jpg",
      qualification: "Neurologist",
      location: "Apollo Hospital",
    },
    "Dr. K. Srinivasan": {
      image: "/doc4.jpg",
      qualification: "Pediatrician",
      location: "Utkal Hospital",
    },
    "Dr. Arvinder Singh Soin": {
      image: "/doc5.jpg",
      qualification: "Orthopedic",
      location: "Care Hospital",
    },
    "Dr. Kamini Rao": {
      image: "/doc6.jpg",
      qualification: "Gynecologist",
      location: "Kalinga Hospital",
    },
    "Dr. Rashmi Shetty": {
      image: "/doc7.jpg",
      qualification: "Endocrinologist",
      location: "AIIMS BBSR",
    },
    "Dr. Kaushal Malhan": {
      image: "/doc8.jpg",
      qualification: "Oncologist",
      location: "SCB Medical College, Cuttack",
    },
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Search for:", { speciality, doctor });
  };

  const filteredDoctors = Object.entries(doctorsData).filter(
    ([name, details]) =>
      (doctor && name === doctor) ||
      (speciality && details.speciality === speciality)
  );

  return (
    <div className=" bg-gray-100 min-h-screen ">
      {/* Top Image */}
      <div className=" relative">
        <img
          src="/find.jpg"
          alt="Hospital Banner"
          className="w-full h-[600px]"
        />
        <form
          onSubmit={handleSubmit}
          className=" absolute inset-0 h-[90px] w-[1200px] flex border border-red-900  p-2 rounded-lg justify-around  mt-[33%] ml-64 bg-slate-100 shadow-lg"
        >
          <select
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            className="p-2  w-[500px]  rounded cursor-pointer text-xl font-semibold bg-slate-100 outline-none text-black"
          >
            <option value="">Select Speciality</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Endocrinologist">Endocrinologist</option>
            <option value="Oncologist">Oncologist</option>
          </select>
          <div className=" border border-blue-900 h-11 mt-3" />
          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className="p-2 w-[500px]  rounded cursor-pointer text-xl font-semibold bg-slate-100 outline-none text-black"
          >
            <option value="">Select Doctor</option>
            <option value="Dr. Sangeeta Agarwal">Dr. Sangeeta Agarwal</option>
            <option value="Dr. R. K. Anand">Dr. R. K. Anand</option>
            <option value="Dr. Y. K. Amdekar">Dr. Y. K. Amdekar</option>
            <option value="Dr. K. Srinivasan">Dr. K. Srinivasan</option>
            <option value="Dr. Arvinder Singh Soin">Dr. Arvinder Singh Soin</option>
            <option value="Dr. Kamini Rao">Dr. Kamini Rao</option>
            <option value="Dr. Rashmi Shetty">Dr. Rashmi Shetty</option>
            <option value="Dr. Kaushal Malhan">Dr. Kaushal Malhan</option>
          </select>
          <button
            type="submit"
            className="bg-red-500 flex items-center justify-center rounded-lg gap-1 h-10 w-32 mt-4 text-xl"
          >
            <CiSearch className="" />
            Search
          </button>
        </form>
      </div>

      <div className=" ">
        {/* Doctor Profile Card */}
        <div className="mt-20 grid grid-cols-1 gap-4 ml-[300px] mr-80 mb-10">
          {filteredDoctors.length > 0
            ? filteredDoctors.map(([name, details]) => (
                <div
                  key={name}
                  className="bg-white p-4 rounded-lg border border-blue-300 shadow-blue-100 flex gap-4 items-center mb-10"
                >
                  <img
                    src={details.image}
                    alt={name}
                    className=" w-[300px] h-[270px]  rounded-lg"
                  />
                  <div>
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-lg">
                      {details.location}
                    </span>
                    <h3 className="text-lg font-bold mt-2 text-black">{name}</h3>
                    <p className="text-gray-600 text-sm">
                      {details.qualification}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Link 
                      href="/appointment"
                       className="bg-blue-500 text-white px-4 py-2 rounded">
                        Book Appointment
                      </Link>
                      <button className="bg-gray-600 px-4 py-2 rounded text-white">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : Object.entries(doctorsData).map(([name, details]) => (
                <div
                  key={name}
                  className="bg-white p-4 rounded-lg shadow-md flex gap-4 items-center border border-blue-300 mb-10"
                >
                  <img
                    src={details.image}
                    alt={name}
                    className=" w-[300px] h-[270px] rounded-lg"
                  />
                  <div>
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-lg">
                      {details.location}
                    </span>
                    <h3 className="text-lg font-bold mt-2 text-black">{name}</h3>
                    <p className="text-gray-600 text-sm">
                      {details.qualification}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Link href= "/appointment" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Book Appointment
                      </Link>
                      <button className="bg-gray-300 px-4 py-2 rounded text-black">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorSearch;
