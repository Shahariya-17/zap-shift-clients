// pages/Logout.jsx
import React, { useEffect, useContext } from "react";
;
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext/AuthoContext";

const LogOut = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.error(err));
  }, [logOut, navigate]);

  return <p>Logging out...</p>;
};

export default LogOut;
