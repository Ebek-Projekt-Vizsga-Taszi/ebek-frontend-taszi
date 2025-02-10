import React, { useState } from "react";
import Navbar from "./Navbar";
import Urlapok from "./navbarcomponents/Urlapok";
import Ujurlap from "./navbarcomponents/Ujurlap";
import Kutyak from "./navbarcomponents/Kutyak";
import Ertesitesek from "./navbarcomponents/Ertesitesek";
import Profil from "./navbarcomponents/Profil";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Űrlapok");

  const formList = [
    { id: 1, name: "Űrlap 1", url: "/path/to/űrlap1.pdf" },
    { id: 2, name: "Űrlap 2", url: "/path/to/űrlap2.pdf" },
    { id: 3, name: "Űrlap 3", url: "/path/to/űrlap3.pdf" }
  ];

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="content p-4">
        {activeTab === "Űrlapok" && <Urlapok formList={formList} />}
        {activeTab === "Új űrlap" && <Ujurlap />}
        {activeTab === "Kutyák" && <Kutyak />}
        {activeTab === "Értesítések" && <Ertesitesek />}
        {activeTab === "Profil" && <Profil />}
      </div>
    </div>
  );
};

export default Dashboard;
