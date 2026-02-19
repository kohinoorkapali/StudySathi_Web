import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if (!token) return <Outlet />;

  return role === "admin"
    ? <Navigate to="/admin" replace />
    : <Navigate to="/dashboard" replace />;
};


export default PublicRoutes;
