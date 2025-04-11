"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 3,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 4 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1 } },
      ],
    };

  const doctors = [
    {
      name: "Dr. Paradox Alex",
      specialty: "Skin Specialist",
      img: "/doc1.jpg",
    },
    {
      name: "Dr. Jane Smith",
      specialty: "Cardiologist",
      img: "/doc2.jpg",
    },
    { name: "Dr. John Doe", specialty: "Neurologist", img: "/doc3.jpg" },
    {
      name: "Dr. Emily Clark",
      specialty: "Pediatrician",
      img: "/doc4.jpg",
    },
    {
      name: "Dr. Michael Brown",
      specialty: "Orthopedic",
      img: "/doc5.jpg",
    },
    {
      name: "Dr. Sarah Wilson",
      specialty: "Dermatologist",
      img: "/doc6.jpg",
    },
    {
      name: "Dr. David Lee",
      specialty: "Endocrinologist",
      img: "/doc7.jpg",
    },
    { name: "Dr. Laura Adams", specialty: "Oncologist", img: "/doc8.jpg" },
  ];

  
  

  return (
    <main className=" w-full max-lg:flex-col max-lg:gap-8  max-lg:px-0 mt-6">
      {/* Img  */}
      <div className=" w-full h-[60vh] relative">
        <Image
          className=" max-lg:object-cover w-full h-full max-lg:rounded-none"
          src="/hospital.jpg"
          width={1200}
          height={1200}
          alt=""
        />
      </div>

      {/* Short Story  */}
      <div className="container relative h-[80vh] overflow-hidden mx-auto px-4 flex flex-col md:flex-row md:items-center">
        {/* Left Section */}
        <div className="md:w-1/2 items-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4 ml-28">
            Short Story About Our Hospital
          </h1>
          <p className="text-gray-700 mb-4 ml-20 text-xl font-serif">
            The seeds of our origin were sown as early as 1953 when the founder
            of the Manipal Education and Medical Group (MEMG), Dr. T.M.A. Pai,
            established the Kasturba Medical College in Manipal, Karnataka.
            Manipal Hospitals as an entity came into existence in 1991 with the
            launch of our 650-bed flagship hospital at Old Airport Road,
            Bangalore. Today, we are one of India's leading healthcare groups
            with over 10500 beds across 37 hospitals.
          </p>
          <p className="text-gray-700 mb-6 ml-20 text-xl font-serif">
            Our core values are built around the thought of patient-first and
            that each doctor at Manipal Hospitals is a human care expert, going
            above and beyond the call of duty as they live by the belief that
            every single life is priceless. When they embark on these journeys,
            stories emerge - stories of grit, determination and never giving up.
            Join us on a journey to discover stories that reinforce your belief
            in 'Life's On'.
          </p>
          <Link href="/appointment" className="bg-blue-900 text-white px-10 py-5 text-xl rounded-lg font-semibold hover:bg-blue-800 mb-6 ml-20">
            Find a Doctor
          </Link>
        </div>

        {/* Right Section */}
        <div className="md:w-80 bg-blue-900 text-white h-[100vh] rounded-lg absolute top-[20%] right-[10%]  p-6 mt-40 md:mt-0 md:ml-8">
          {[
            { value: "70+", label: "YEARS OF EXPERIENCE" },
            { value: "37", label: "HOSPITALS" },
            { value: "5600+", label: "DOCTORS" },
            { value: "10500+", label: "BEDS" },
            { value: "19", label: "SERVING CITIES" },
            { value: "45+", label: "MILLION LIVES TOUCHED" },
          ].map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              <div className="w-4 h-4 bg-white rounded-full mr-4"></div>
              <div>
                <h2 className="text-2xl font-bold">{item.value}</h2>
                <p className="text-sm">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meet Our Specialists */}
      <div className="  py-12 bg-blue-900">
        <h2 className="text-5xl font-bold text-center mb-4 text-blue-300">
          Meet Our Specialists
        </h2>
        <p className="text-center mb-8 text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <Slider {...settings}>
          {doctors.map((doctor, index) => (
            <div key={index} className="p-4">
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg text-center">
                <img
                  src={doctor.img}
                  alt={doctor.name}
                  className="w-full h-70 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {doctor.name}
                  </h3>
                  <p className="text-gray-600">{doctor.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>  

      {/* Our Patients feedBack About Us */}
      <div className="bg-blue-900 p-8 h-[80vh ">
        <div className="text-center  mb-8">
          <h1 className="text-5xl font-semibold text-blue-300">
            Our Patients feedBack About Us
          </h1>
          <p className="text-white mt-4 w-[60%] text-center mx-auto items-center justify-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            fuga sit ipsum harum ratione quis placeat modi nesciunt voluptas ea
            pariatur nemo consequatur consequuntur tempora sint, laborum,
            architecto nihil! Eius.
          </p>
        </div>

        {/* Feedback Section */}
        <div className="flex justify-center mt-10 items-center gap-8 mb-10">
          {/* Patient Image */}
          <img
            src="/patients.jpg"
            alt="Patient with doctor"
            className="w-[600px] h-[420px] rounded-lg shadow-lg"
          />

          {/* Feedback Card */}
          <div className=" p-6 rounded-lg  max-w-md">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/t1.jpg"
                alt="Patient Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-lg font-bold text-white">
                  Vaibhav Praharaj
                </h3>
                <p className="text-sm text-white">Odisha</p>
                {/* Stars */}
                <div className=" flex  gap-1 text-yellow-500">
                  
                </div>
              </div>
            </div>
            {/* Feedback Text */}
            <p className="text-red-600 ml-10">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              fugiat voluptatibus, recusandae accusamus distinctio a voluptate
              molestiae nam. Voluptates, non.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center relative justify-center h-[70vh] -mt-16 w-full  ">
        <div className=" rounded-lg p-4 w-full flex">
          {/* Map Section */}
          <div className="w-[60%] mt-20  h-[60vh] overflow-hidden !rounded-2xl ">
            <iframe
              title="Google Map"
              className="w-full rounded-lg p-5 h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4072.2673784966714!2d85.80522357558887!3d20.340361581142297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19091d551a38c7%3A0xd2f96c2eaee7b45f!2sTrident%20Academy%20of%20Creative%20Technology%2C%20near%20Trident%2C%20Infocity%2C%20Chandrasekharpur%2C%20Bhubaneswar%2C%20Odisha%20751024!5e1!3m2!1sen!2sin!4v1742995257725!5m2!1sen!2sin"
              // allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Form Section */}
          <div className=" p-4 w-[30%] absolute right-[7%] top-0 mt-14 bg-blue-900 rounded-lg h-[60vh] ">
            <h2 className="text-5xl font-bold text-center text-blue-300 mb-4 mt-10">
              Contact Us
            </h2>
            <form className="space-y-4 mt-20">
              <input
                type="text"
                placeholder="Your name"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Your message"
                // rows="4"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full p-2 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full border border-gray-200  mx-3 "></div>

      


      {/* <div className=" max-md:px-4 max-lg:px-6 ">
        <h1 className=" text-4xl font-semibold logo2">
          {role && role === "admin"
            ? "Hii Admin , welcome back"
            : "create appointment in just simple steps."}
        </h1>
        {user ? (
          <>
            {role && role === "admin" ? (
              <Link
                className=" border-2 border-[#ffffff30] inshadow footer2 max-lg:mt-6 mt-10 block rounded-xl w-fit px-7 py-2 "
                href={"/admin"}
              >
                Go to admin dashboard
              </Link>
            ) : (
              <Link
                className=" border-2 border-[#ffffff30] inshadow footer2 max-lg:mt-6 mt-10 block rounded-xl w-fit px-7 py-2 "
                href={"/appointment"}
              >
                Create Appoinment
              </Link>
            )}
          </>
        ) : (
          <Link
            className=" border-2 border-[#ffffff30] inshadow footer2 max-lg:mt-6 mt-10 block rounded-xl w-fit px-7 py-2 "
            href={"/sign-in"}
          >
            Login
          </Link>
        )}
      </div> */}
    </main>
  );

}