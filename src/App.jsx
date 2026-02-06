import React, { Suspense, useEffect } from "react";
import AppRoutes from "./AppRoutes";
import "./App.css"

function App() {

  useEffect(() => {
    // Function to set the real viewport height
    function setVh() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setVh(); // set on initial load

    // Update on resize
    window.addEventListener('resize', setVh);

    // Clean up listener on unmount
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
