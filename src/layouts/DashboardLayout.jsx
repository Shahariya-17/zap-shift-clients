import React from "react";
import { NavLink, Outlet } from "react-router";
import ProFastLogo from "../pages/shared/ProFastLogo/ProFastLogo";
import {
  TbHomeHeart,
  TbTruckDelivery,
  TbPackages,
} from "react-icons/tb";
import { MdPayment } from "react-icons/md";
import { FaUserEdit, FaUsers, FaUserClock } from "react-icons/fa";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { motion } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home", icon: <TbHomeHeart className="text-xl" /> },
  { to: "/dashboard/myParcels", label: "My Parcels", icon: <TbPackages className="text-xl" /> },
  { to: "/dashboard/paymentHistory", label: "Payment History", icon: <HiOutlineReceiptRefund className="text-xl" /> },
  { to: "/dashboard/track", label: "Track a Package", icon: <TbTruckDelivery className="text-xl" /> },
  { to: "/dashboard/profile", label: "Update Profile", icon: <FaUserEdit className="text-xl" /> },
  { to: "/dashboard/activeRiders", label: "Active Riders", icon: <FaUsers className="text-xl" /> },
  { to: "/dashboard/pendingRiders", label: "Pending Riders", icon: <FaUserClock className="text-xl" /> },
];

const activeClass = ({ isActive }) =>
  isActive
    ? "flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-lime-500 to-green-500 text-white font-semibold shadow-md scale-[1.02] transition-all duration-300"
    : "flex items-center gap-3 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-[1.03]";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gray-50 dark:bg-gray-900">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      {/* Main Content Area */}
      <div className="drawer-content flex flex-col">
        {/* Navbar (Mobile) */}
        <div className="navbar lg:hidden bg-lime-500 text-white shadow-md w-full">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 text-center font-semibold">Dashboard</div>
        </div>

        {/* Page content */}
        <motion.div
          className="p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <motion.ul
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="menu bg-white dark:bg-gray-800 text-base-content min-h-full w-80 p-6 shadow-lg border-r border-gray-200 dark:border-gray-700"
        >
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <ProFastLogo />
            </motion.div>
          </div>

          {/* Navigation Links */}
          {navLinks.map((link, idx) => (
            <motion.li
              key={idx}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <NavLink to={link.to} className={activeClass}>
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
