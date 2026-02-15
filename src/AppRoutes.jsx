// src/AppRoutes.jsx
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./Routes/PublicRoutes";
import PrivateRoutes from "./Routes/PrivateRoutes";

// Lazy-loaded pages
const LandingPage = React.lazy(() => import("./pages/Public/LandingPage"));
const UserLogin = React.lazy(() => import("./pages/Public/Login"));
const UserRegister = React.lazy(() => import("./pages/Public/Register"));
const Dashboard = React.lazy(() => import("./pages/Private/Dashboard"));
const Browse = React.lazy(() => import("./pages/Private/Browse"));
const MyResources = React.lazy(() => import("./pages/Private/MyResource"));
const UploadResource = React.lazy(() => import("./pages/Private/UploadResource"));
const Profile = React.lazy(() => import("./pages/Private/Profile"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        
        <Route element={<PublicRoutes />}>
        <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/resources" element={<MyResources />} />
          <Route path="/profile" element={<Profile />} />
          
        </Route>

        <Route element={<PrivateRoutes noHeader />}>
          <Route path="/upload" element={<UploadResource />} />
        </Route>
        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
