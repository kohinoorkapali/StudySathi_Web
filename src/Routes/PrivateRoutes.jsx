// PrivateRoutes.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const PrivateRoutes = ({ allowedRoles, noHeader }) => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // If user tries to access something not allowed
    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return (
    <>
      {!noHeader && <Header />}
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
