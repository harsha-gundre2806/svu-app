// File: src/components/Header.jsx

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
          {/* Logo & Title */}
          <div className="flex items-center space-x-2">
            <a href="/" className="rounded-full transition hover:text-blue-600 inline-block">
              <img
                src="logo.jpg"
                alt="SVU Logo"
                className="h-12 w-auto rounded-lg transition-transform transform hover:scale-105"
              />
            </a>

            <span className="text-xl font-semibold text-gray-800">
              SVU STUDENT WEBSITE
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <a href="/about-svu" className="hover:text-blue-600 transition">About</a>
            <a href="/announcements" className="hover:text-blue-600 transition">Announcements</a>
            <a href="/gallery" className="hover:text-blue-600 transition">Image Gallery</a>

            
          </nav>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden text-gray-700">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <X className="w-10 h-10" />
              ) : (
                <Menu className="w-10 h-10" />
              )}
            </button>
          </div>
        </div>
      </header>

     {/* Mobile Dropdown as Fixed Glassmorphic Header */}
<div
  className={`md:hidden fixed top-0 left-0 w-full bg-white bg-opacity-25 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out z-40 overflow-hidden ${
    isMobileMenuOpen ? 'h-44 opacity-100' : 'h-0 opacity-0'
  }`}
>
  <nav className="flex flex-col space-y-2 p-4 text-black-700 font-medium mt-16">
    <a href="/about-svu" className="hover:text-blue-500 transition">About</a>
    <a href="/announcements" className="hover:text-blue-500 transition">Announcements</a>
     <a href="/gallery" className="hover:text-blue-600 transition">Image Gallery</a>
  </nav>
</div>


      {/* Spacer to push content down when menu is open */}
      <div className={`${isMobileMenuOpen ? 'h-16' : 'h-0'} transition-all duration-300 ease-in-out`} />
    </>
  );
};

export default Header;







