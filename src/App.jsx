import React, { Suspense } from "react";
import AppRoutes from "./AppRoutes";
import "./App.css"

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppRoutes />
    </Suspense>

  );
}

export default App;
