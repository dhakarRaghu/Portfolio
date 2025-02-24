"use client"; // Mark as Client Component since MobileMenu is client-side

import React from "react";
import Image from "next/image";
import MobileMenu from "./MobileMenu"; // Adjust import path as needed

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-neutral-900/95 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo and Photo */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Image
              src="/me.jpg" // Replace with your actual photo path in /public
              alt="Profile Photo"
              width={40}
              height={40}
              className="rounded-full border-2 border-blue-500 shadow-sm object-cover"
            />
            <span className="text-blue-500 text-2xl font-extrabold tracking-tight">Raghu</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <div className="flex items-baseline space-x-4">
              <a
                href="#Hero"
                className="text-gray-300 hover:text-white hover:bg-neutral-800 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-white hover:bg-neutral-800 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out"
              >
                About
              </a>
              <a
                href="#skills"
                className="text-gray-300 hover:text-white hover:bg-neutral-800 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="text-gray-300 hover:text-white hover:bg-neutral-800 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out"
              >
                Projects
              </a>
              <a
                href="#CP"
                className="text-gray-300 hover:text-white hover:bg-neutral-800 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out"
              >
                CP
              </a>
              <a
                href="#experience"
                className="text-gray-300 hover:text-white hover:bg-neutral-800 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out"
              >
                Experience
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-white hover:bg-neutral-800 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Mobile Menu Button and Menu (Client Component) */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}