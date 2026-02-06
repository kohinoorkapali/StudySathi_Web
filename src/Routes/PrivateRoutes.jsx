import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header/Header"; // import Header


const PrivateRoutes = ({ noHeader }) => {
  const token = localStorage.getItem("access_token");
  if (!token) return <Navigate to="/login" replace />;

  return (
    <>
      {!noHeader && <Header />}
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
