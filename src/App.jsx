import React from "react";
import Landing from "./pages/Landing/LandingPage.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>} />
    </Routes>
    

  )
}

export default App
