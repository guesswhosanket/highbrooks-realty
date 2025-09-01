import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


export const Navbar: React.FC = () => {

  return (
    <nav className="bg-[#0f172a] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-[#7c7ff3] rounded-full flex items-center justify-center mr-2">
                  <span className="text-white font-bold">H</span>
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
