import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-opacity-50 mt-6 bg-[#171831] backdrop-filter border border-[#ead8f13b] backdrop-blur-lg w-full md:w-3/4 z-50 p-2 rounded-2xl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* Website Logo */}
              <a href="#" className="flex items-center py-4 px-2">
                <span className="font-semibold text-white text-lg">kuberX</span>
              </a>
            </div>
            {/* Primary Navbar items */}
            <div className="hidden md:flex items-center space-x-1">
              <a
                href="#"
                className="py-4 px-2 text-white text-sm hover:text-gray-400 transition duration-300"
              >
                About
              </a>
              <a
                href="#"
                className="py-4 px-2 text-white text-sm hover:text-gray-400 transition duration-300"
              >
                Features
              </a>
              <a
                href="#"
                className="py-4 px-2 text-white text-sm hover:text-gray-400 transition duration-300"
              >
                Pricing
              </a>
              <a
                href="#"
                className="py-4 px-2 text-white text-sm hover:text-gray-400 transition duration-300"
              >
                Blog
              </a>
              <a
                href="#"
                className="py-4 px-2 text-white text-sm hover:text-gray-400 transition duration-300"
              >
                Contact
              </a>
            </div>
          </div>
          {/* Secondary Navbar items */}
          <div className="hidden md:flex items-center space-x-3 ">
            <a
              href="#"
              className="py-2 px-2 font-medium text-white rounded hover:bg-gray-700 transition duration-300"
            >
              Login
            </a>
            <a
              href="#"
              className="py-2 px-3 bg-purple-500 text-white rounded hover:bg-purple-400 transition duration-300"
            >
              lorem ipsum
            </a>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-white "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d={
                    !isMenuOpen
                      ? "M4 6h16M4 12h16M4 18h16"
                      : "M6 18L18 6M6 6l12 12"
                  }
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "flex" : "hidden"
        } flex-col items-center absolute bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg w-full`}
      >
        <a
          href="#"
          className="block py-2 px-4 text-sm text-white hover:bg-gray-700"
        >
          About
        </a>
        <a
          href="#"
          className="block py-2 px-4 text-sm text-white hover:bg-gray-700"
        >
          Features
        </a>
        <a
          href="#"
          className="block py-2 px-4 text-sm text-white hover:bg-gray-700"
        >
          Pricing
        </a>
        <a
          href="#"
          className="block py-2 px-4 text-sm text-white hover:bg-gray-700"
        >
          Blog
        </a>
        <a
          href="#"
          className="block py-2 px-4 text-sm text-white hover:bg-gray-700"
        >
          Contact
        </a>
        <a
          href="#"
          className="block py-2 px-4 text-sm text-white hover:bg-gray-700"
        >
          Login
        </a>
        <a
          href="#"
          className="block py-2 px-4 text-sm text-white bg-purple-500 rounded hover:bg-purple-400"
        >
          lorem ipsum
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
