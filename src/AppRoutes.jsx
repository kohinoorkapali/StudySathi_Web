// src/AppRoutes.jsx
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./Routes/PublicRoutes";
import PrivateRoutes from "./Routes/PrivateRoutes";

// Lazy-loaded pages
const LandingPage = React.lazy(() => import("./pages/Public/Landing"));
const UserLogin = React.lazy(() => import("./pages/Public/Login"));
const UserRegister = React.lazy(() => import("./pages/Public/Register"));
const Dashboard = React.lazy(() => import("./pages/Private/Dashboard"));


const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Landing Page - anyone can see */}
        <Route path="/" element={<LandingPage />} />

        {/* Public Routes (login, register) */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
        </Route>

        {/* Private Routes (after login) */}
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />

        </Route>

        {/* Redirect unknown paths to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
