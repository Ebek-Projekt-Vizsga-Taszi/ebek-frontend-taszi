import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./components/LandingPage"; 
import Iranyelvek from "./components/Iranyelvek";
import Bejelentkezés from "./components/Bejelentkezés"; 
import Regisztracio from "./components/Regisztracio"; 
import Dashboard from "./components/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Definiáld az állapotot

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Autentikáció állapotának beállítása, ha van token
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Iranyelvek" element={<Iranyelvek />} />
          <Route path="/Bejelentkezés" element={<Bejelentkezés setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/Regisztracio" element={<Regisztracio />} /> 
          <Route path="/Dashboard" element={isAuthenticated ? <Dashboard /> : <Bejelentkezés setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
