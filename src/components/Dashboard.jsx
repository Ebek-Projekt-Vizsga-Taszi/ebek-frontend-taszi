import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Urlapok from "./navbarcomponents/Urlapok";
import Ujurlap from "./navbarcomponents/Ujurlap";
import Ertesitesek from "./navbarcomponents/Ertesitesek";
import Profil from "./navbarcomponents/Profil";
import { startNotificationTimer } from "./navbarcomponents/Timer";
import { Particles } from "./navbarcomponents/Particles";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Űrlapok");
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    startNotificationTimer(setHasNotification);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Háttér Particles */}
      <Particles className="absolute inset-0 -z-10" quantity={150} color="#ffffff" />

      {/* Tartalom réteg */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} hasNotification={hasNotification} />
      <div className="mt-16 p-4">
        {activeTab === "Űrlapok" && <Urlapok />}
        {activeTab === "Új űrlap" && <Ujurlap />}
        {activeTab === "Értesítések" && <Ertesitesek />}
        {activeTab === "Profil" && <Profil />}
      </div>
    </div>
  );
};

export default Dashboard;
