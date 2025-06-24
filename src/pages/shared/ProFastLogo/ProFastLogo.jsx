import React from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom"; // ✅ Fixed import

const ProFastLogo = () => {
  return (
    <Link to="/">
      <div className="flex items-end">
        <img className="mb-1 w-8 md:w-10 lg:w-12" src={logo} alt="ProFast Logo" />
        <p className="text-xl md:text-3xl lg:text-4xl text-lime-300 -ml-1 md:-ml-2 font-extrabold">
          ProFast
        </p>
      </div>
    </Link>
  );
};

export default ProFastLogo;
