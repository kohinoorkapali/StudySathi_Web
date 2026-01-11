// src/App.jsx
import React, { Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import "./App.css";

// Lazy-loaded pages
const LandingPage = React.lazy(() => import("./pages/Public/LandingPage"));
const UserLogin = React.lazy(() => import("./pages/Public/Login"));
const UserRegister = React.lazy(() => import("./pages/Public/Register"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Public Pages */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />

        {/* Redirect unknown paths to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
