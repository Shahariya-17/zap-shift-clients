import React from "react";
import { NavLink } from "react-router-dom";
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import { LuCircleArrowOutUpRight } from "react-icons/lu";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const navItems = (
    <>
      <li className="whitespace-nowrap">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-lime-500 text-white px-3 md:px-4 py-2 rounded text-sm md:text-base"
              : "px-3 md:px-4 py-2 rounded hover:bg-gray-100 hover:text-black text-sm md:text-base"
          }
        >
          Home
        </NavLink>
      </li>
      <li className="whitespace-nowrap">
        <NavLink
          to="/sendParcel"
          className={({ isActive }) =>
            isActive
              ? "bg-lime-500 text-white px-3 md:px-4 py-2 rounded text-sm md:text-base"
              : "px-3 md:px-4 py-2 rounded hover:bg-gray-100 hover:text-black text-sm md:text-base"
          }
        >
          Send Parcel
        </NavLink>
      </li>
      <li className="whitespace-nowrap">
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            isActive
              ? "bg-lime-500 text-white px-3 md:px-4 py-2 rounded text-sm md:text-base"
              : "px-3 md:px-4 py-2 rounded hover:bg-gray-100 hover:text-black text-sm md:text-base"
          }
        >
          Coverage
        </NavLink>
      </li>

      {user && (
        <li className="whitespace-nowrap">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "bg-lime-500 text-white px-3 md:px-4 py-2 rounded text-sm md:text-base"
                : "px-3 md:px-4 py-2 rounded hover:bg-gray-100 hover:text-black text-sm md:text-base"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}

      <li className="whitespace-nowrap">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "bg-lime-500 text-white px-3 md:px-4 py-2 rounded text-sm md:text-base"
              : "px-3 md:px-4 py-2 rounded hover:bg-gray-100 hover:text-black text-sm md:text-base"
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm px-2 md:px-6 w-full fixed top-0 left-0 z-50">
        
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
          <span className="text-xl md:text-2xl font-bold whitespace-nowrap">
            <ProFastLogo />
          </span>
        </div>

        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1 md:gap-2 flex-wrap">
            {navItems}
          </ul>
        </div>

        
        <div className="navbar-end gap-2 md:gap-3 text-sm md:text-base whitespace-nowrap">
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn bg-lime-400 text-black"
            >
              Log Out
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-gray-300 font-medium transition ${
                  isActive
                    ? "bg-lime-500 text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`
              }
            >
              Log In
            </NavLink>
          )}

          <NavLink
            to="/beARider"
            className={({ isActive }) =>
              `flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full border font-semibold transition ${
                isActive
                  ? "bg-lime-500 text-white"
                  : "bg-white text-black border-gray-300 hover:bg-lime-400"
              }`
            }
          >
            Be a rider
            <span className="ml-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-black text-white flex items-center justify-center">
              <LuCircleArrowOutUpRight size={14} />
            </span>
          </NavLink>
        </div>
      </div>

      
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
