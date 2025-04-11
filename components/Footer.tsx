"use client"
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" mt-2 body py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Madi Care Section */}
        <div>
          <h2 className="text-lg font-bold text-blue-200 mb-2">
            <span className="bg-blue-900 text-white px-2 py-1 rounded">We</span> Care
          </h2>
          <p>8RR5+54H, Infocity, Chandrasekharpur,<br /> Bhubaneswar, Odisha 751024</p>
          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <FaFacebookF className="text-gray-600 hover:text-blue-600 cursor-pointer text-xl" />
            <FaInstagram className="text-gray-600 hover:text-pink-500 cursor-pointer text-xl" />
            <FaTwitter className="text-gray-600 hover:text-blue-300 cursor-pointer text-xl" />
            <FaYoutube className="text-gray-600 hover:text-red-600 cursor-pointer text-xl" />
          </div>
        </div>

        {/* Main Links */}
        <div>
          <h3 className="text-lg font-bold text-blue-500 mb-2">Main Link's</h3>
          <ul className="space-y-1">
            <li className=' hover:underline cursor-pointer'>Home</li>
            <li className='hover:underline'>About</li>
            <li className='hover:underline'>Contact</li>
            <li className='hover:underline'>Services</li>
          </ul>
        </div>

        {/* External Links */}
        <div>
          <h3 className="text-lg font-bold text-blue-500 mb-2">External Link's</h3>
          <ul className="space-y-1">
            <li className=' hover:underline cursor-pointer'>Our Product</li>
            <li className=' hover:underline cursor-pointer'>Privacy Policy</li>
            <li className=' hover:underline cursor-pointer'>Disclaimer</li>
            <li className=' hover:underline cursor-pointer'>Trem's and Condition's</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className=" flex justify-evenly text-center text-sm mt-8 border-t pt-4">
        <p>Made By Hitesh kumar 🤖</p>
        <p>&#169; Copyright 2024 - We Care</p>
      </div>
    </footer>
  );
};

export default Footer;

