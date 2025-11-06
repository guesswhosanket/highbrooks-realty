import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';


export const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-[#0f172a] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-[#7c7ff3] rounded-full flex items-center justify-center mr-2">
                </div>
                <span className="text-xl font-bold text-white">Highbrook Realty AI</span>
              </Link>
            </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="border-transparent text-gray-300 hover:border-[#7c7ff3] hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200">
                Home
              </Link>
              <Link href="/about" className="border-transparent text-gray-300 hover:border-[#7c7ff3] hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200">
                About
              </Link>
              <Link href="/blog" className="border-transparent text-gray-300 hover:border-[#7c7ff3] hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200">
                Blog
              </Link>
              <div className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                <button className="border-transparent text-gray-300 hover:border-[#7c7ff3] hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200">
                  Services
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 mt-0 w-56 rounded-md shadow-lg bg-[#1e293b] ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <Link href="/services/cafe-analysis" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" role="menuitem">
                        Café Location Analysis
                      </Link>
                      <Link href="/services/restaurant-analysis" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" role="menuitem">
                        Restaurant Location Intelligence
                      </Link>
                      <Link href="/services/hotel-analysis" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" role="menuitem">
                        Hotel Viability Reports
                      </Link>
                      <Link href="/services/hostel-analysis" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" role="menuitem">
                        Hostel Market Analysis
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              {/* Temporarily removed My Reports link that required auth */}
            </div>
          </div>
          <div className="flex items-center">
            {/* Auth buttons temporarily removed */}
          </div>
        </div>
      </div>
    </nav>
  );
};
