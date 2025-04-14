// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";

// Főoldalak importálása
import LandingPage from "./components/LandingPage";
import Iranyelvek from "./components/Iranyelvek";
import Bejelentkezés from "./components/Bejelentkezés";
import Regisztracio from "./components/Regisztracio";
import NotFound from "./components/NotFound";

// Dashboard illetve dashboard aloldalak importálása
import Urlapok from "./components/Urlapok";

// Navbar importálása, mely a dashboard layout részét képezi
import Navbar from "./components/Navbar";
import Ertesitesek from "./components/navbarcomponents/Ertesitesek";
import Ujurlap from "./components/Ujurlap";
import Profil from "./components/navbarcomponents/Profil";

// Dashboard layout, mely a navigációs sávot és az Outlet-et tartalmazza
const DashboardLayout = ({ setIsAuthenticated, hasNotification }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  // Az aktív tab beállítása az aktuális URL alapján
  useEffect(() => {
    if (location.pathname.includes("Urlapok")) {
      setActiveTab("Űrlapok");
    } else if (location.pathname.includes("UjUrlap")) {
      setActiveTab("Új űrlap");
    } else if (location.pathname.includes("Ertesitesek")) {
      setActiveTab("Értesítések");
    } else if (location.pathname.includes("Profil")) {
      setActiveTab("Profil");
    }
  }, [location]);

  return (
    <div>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} hasNotification={true} />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // Az autentikáció ellenőrzése (például egy token alapján a localStorage-ból)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Ha az autentikáció ellenőrzése még folyamatban van, nem rendereljük az alkalmazást (vagy megjelenítünk egy loading spinner-t)
  if (isAuthenticated === null) {
    return null;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Iranyelvek" element={<Iranyelvek />} />
        <Route path="/Bejelentkezés" element={<Bejelentkezés setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/Regisztracio" element={<Regisztracio />} />
        
        {/* Védett Dashboard útvonal */}
        <Route
          path="/Dashboard/*"
          element={
            isAuthenticated ? (
              <DashboardLayout setIsAuthenticated={setIsAuthenticated} hasNotification={true} />
            ) : (
              <Navigate to="/Bejelentkezés" replace />
            )
          }
        >
          {/* Alapértelmezett átirányítás a dashboardon belül az Űrlapok oldalra */}
          <Route index element={<Navigate to="Urlapok" replace />} />
          
          {/* Dashboard aloldalak */}
          <Route path="Urlapok" element={<Urlapok />} />
          <Route path="UjUrlap" element={<Ujurlap />} />
          <Route path="Ertesitesek" element={<Ertesitesek />} />
          <Route path="Profil" element={<Profil />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
