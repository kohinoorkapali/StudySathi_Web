import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header/Header"; // import Header

const PrivateRoutes = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return <Navigate to="/login" replace />;

  return (
    <>
      <Header />  {/* Only for private pages */}
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
