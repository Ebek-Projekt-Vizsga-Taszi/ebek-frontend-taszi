import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Iranyelvek from "./components/Iranyelvek";
import Bejelentkezés from "./components/Bejelentkezés";
import Regisztracio from "./components/Regisztracio";
import Dashboard from "./components/Dashboard";
import NotFound  from "./components/NotFound";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Kezdetben null

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Ha van token, true, ha nincs, false
  }, []);

  // Ha még nem történt meg az autentikáció ellenőrzése, ne renderelj semmit
  if (isAuthenticated === null) {
    return null; // Vagy egy loading spinner
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Iranyelvek" element={<Iranyelvek />} />
          <Route path="/Bejelentkezés" element={<Bejelentkezés setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/Regisztracio" element={<Regisztracio />} />
          <Route
            path="/Dashboard"
            element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/Bejelentkezés" />}
          />
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
