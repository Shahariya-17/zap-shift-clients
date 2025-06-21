import React from "react";
import { NavLink } from "react-router-dom"; // ✅ Correct import
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import { LuCircleArrowOutUpRight } from "react-icons/lu";

const Navbar = () => {
  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-lime-500 text-white px-4 py-2 rounded"
              : "px-4 py-2 rounded hover:bg-gray-100"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "bg-lime-500 text-white px-4 py-2 rounded"
              : "px-4 py-2 rounded hover:bg-gray-100"
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Left: Logo and dropdown */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10"
          >
            {navItems}
          </ul>
        </div>
        <a className="btn text-xl">
          <ProFastLogo />
        </a>
      </div>

      {/* Center: Menu on large screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navItems}</ul>
      </div>

      {/* Right: Auth buttons */}
      <div className="navbar-end gap-3">
        {/* Sign In Button */}
        <NavLink
          to="/signIn"
          className={({ isActive }) =>
            `px-4 py-2 rounded-full border border-gray-300 font-medium transition ${
              isActive
                ? "bg-lime-500 text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`
          }
        >
          Sign In
        </NavLink>

        {/* Be a rider button with icon */}
        <NavLink
          to="/beARider"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-full border font-semibold transition ${
              isActive
                ? "bg-lime-500 text-white"
                : "bg-white text-black border-gray-300 hover:bg-lime-400"
            }`
          }
        >
          Be a rider
          <span className="ml-2 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
            <LuCircleArrowOutUpRight size={14} />
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
