import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserID } from "../hooks/getUserID";
import { getUserName } from "../hooks/getUserName";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userID, setUserID] = useState(getUserID());
  const [username, setUsername] = useState(getUserName());
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleLinkClick = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setUserID(getUserID());
      setUsername(getUserName());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("username");
    setUserID(null);
    setUsername(null);
    window.location.reload();
    navigate("/");
  };
  return (
    <nav className="bg-opacity-50 mt-6 bg-[#171831] backdrop-filter border border-[#ead8f13b] backdrop-blur-lg w-full md:w-3/4 p-2 rounded-2xl ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* Website Logo */}
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-white text-2xl">
                  KuberX
                </span>
              </Link>
            </div>
            {/* Primary Navbar items */}
            <div className="hidden md:flex items-center  w-full pl-60 space-x-1">
              <Link
                to="/hows-market"
                className="py-4 px-2 text-white text-base hover:text-gray-400 transition duration-300"
              >
                Hows Market
              </Link>
              <Link
                to="/stocks"
                className="py-4 px-2 text-white text-base hover:text-gray-400 transition duration-300"
              >
                Stocks
              </Link>
              {userID && (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="py-4 px-2 text-white text-base hover:text-gray-400 transition duration-300"
                  >
                    Add Transcation
                  </button>
                  {/* Dropdown menu */}
                  {showDropdown && (
                    <div className="absolute z-50 top-full -mt-3 bg-white border border-gray-200 rounded-md shadow-lg">
                      <Link
                        to="/add/expense"
                        onClick={handleLinkClick}
                        className="block py-2 px-4 text-gray-800 hover:bg-gray-200"
                      >
                        Expense
                      </Link>
                      <Link
                        to="/add/income"
                        onClick={handleLinkClick}
                        className="block py-2 px-4 text-gray-800 hover:bg-gray-200"
                      >
                        Income
                      </Link>
                      <Link
                        to="/add/investment"
                        onClick={handleLinkClick}
                        className="block py-2 px-4 text-gray-800 hover:bg-gray-200"
                      >
                        Investment
                      </Link>
                      <Link
                        to="/add/bank-transfer"
                        onClick={handleLinkClick}
                        className="block py-2 px-4 text-gray-800 hover:bg-gray-200"
                      >
                        Bank Transfer
                      </Link>
                    </div>
                  )}{" "}
                </div>
              )}
              {userID && (
                <Link
                  to="/friends"
                  className="py-4 px-2 text-white text-base hover:text-gray-400 transition duration-300"
                >
                  Friends
                </Link>
              )}
            </div>
          </div>
          {/* Secondary Navbar items */}
          <div className="hidden md:flex items-center space-x-3 ">
            {userID === null ? (
              <Link
                to="./login"
                className="py-2 px-2 font-medium text-white rounded hover:bg-gray-700 transition duration-300"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="py-2 px-2 font-medium text-white rounded hover:bg-gray-700 transition duration-300"
              >
                Logout
              </button>
            )}

            <Link
              href="/dashboard"
              className="py-2 px-3 bg-purple-500 text-white rounded hover:bg-purple-400 transition duration-300"
            >
              {username ? username : ""}
            </Link>
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
        <Link
          to="/login"
          className="block py-2 px-4 text-sm text-white hover:bg-gray-700"
        >
          Login
        </Link>
        <Link
          to="/dashboard"
          className="block py-2 px-4 text-sm text-white bg-purple-500 rounded hover:bg-purple-400"
        >
          lorem ipsum
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
