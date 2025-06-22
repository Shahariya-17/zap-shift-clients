import React from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router";

const ProFastLogo = () => {
  return (
    <Link to='/'>
      <div className="flex items-end">
        <img className="mb-2" src={logo} alt="" />
        <p className="text-4xl text-lime-300 -ml-2 font-extrabold">ProFast</p>
      </div>
    </Link>
  );
};

export default ProFastLogo;
