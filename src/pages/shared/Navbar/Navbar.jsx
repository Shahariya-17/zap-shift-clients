import React from "react";
import { NavLink } from "react-router-dom";
import { LuCircleArrowOutUpRight } from "react-icons/lu";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogOut = () => {
    logOut()
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-lime-500 text-white px-4 py-2 rounded-md block"
              : "px-4 py-2 rounded-md hover:bg-gray-100 text-black block"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/sendParcel"
          className={({ isActive }) =>
            isActive
              ? "bg-lime-500 text-white px-4 py-2 rounded-md block"
              : "px-4 py-2 rounded-md hover:bg-gray-100 text-black block"
          }
        >
          Send Parcel
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            isActive
              ? "bg-lime-500 text-white px-4 py-2 rounded-md block"
              : "px-4 py-2 rounded-md hover:bg-gray-100 text-black block"
          }
        >
          Coverage
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "bg-lime-500 text-white px-4 py-2 rounded-md block"
                : "px-4 py-2 rounded-md hover:bg-gray-100 text-black block"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}

      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "bg-lime-500 text-white px-4 py-2 rounded-md block"
              : "px-4 py-2 rounded-md hover:bg-gray-100 text-black block"
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <ProFastLogo />
          </div>

          
          <ul className="hidden lg:flex gap-2">{navItems}</ul>

          
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <button
                onClick={handleLogOut}
                className="px-4 py-2 bg-lime-400 rounded-full text-black font-medium hover:bg-lime-500 transition"
              >
                Log Out
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full border border-gray-300 font-medium transition ${
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
                `flex items-center px-4 py-2 rounded-full border font-semibold transition ${
                  isActive
                    ? "bg-lime-500 text-white"
                    : "bg-white text-black border-gray-300 hover:bg-lime-400"
                }`
              }
            >
              Be a Rider
              <span className="ml-2 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                <LuCircleArrowOutUpRight size={14} />
              </span>
            </NavLink>
          </div>

          
          <button
            className="lg:hidden p-2 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>

       
        {menuOpen && (
          <div className="lg:hidden bg-white shadow-inner border-t animate-slide-down">
            <ul className="flex flex-col p-3 gap-1">{navItems}</ul>

            <div className="flex flex-col gap-2 p-3">
              {user ? (
                <button
                  onClick={handleLogOut}
                  className="px-4 py-2 bg-lime-400 rounded-full text-black font-medium hover:bg-lime-500 transition"
                >
                  Log Out
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded-full border border-gray-300 text-black font-medium hover:bg-gray-100"
                >
                  Log In
                </NavLink>
              )}

              <NavLink
                to="/beARider"
                className="flex items-center justify-center px-4 py-2 rounded-full border font-semibold bg-white text-black border-gray-300 hover:bg-lime-400 transition"
              >
                Be a Rider
                <span className="ml-2 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                  <LuCircleArrowOutUpRight size={14} />
                </span>
              </NavLink>
            </div>
          </div>
        )}
      </nav>

      
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
