"use client";

import { useState } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-400 hover:text-white">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-neutral-900/95 backdrop-blur-sm`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#hero"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMenu}
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMenu}
          >
            About
          </a>
          <a
            href="#skills"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMenu}
          >
            Skills
          </a>
          <a
            href="#projects"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMenu}
          >
            Projects
          </a>
          <a
            href="#competitive-programming"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMenu}
          >
            CP
          </a>
          <a
            href="#experience"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMenu}
          >
            Experience
          </a>
          <a
            href="#contact"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMenu}
          >
            Contact
          </a>
        </div>
      </div>
    </>
  );
}