import React, { useState } from "react";
import { Particles } from "./navbarcomponents/Particles";

const Navbar = ({ setActiveTab, hasNotification }) => {
  const [szervezet, setSzervezet] = useState(false);
  const [navbarOptions, setNavbarOptions] = useState({
    szervezet: [
      <li>
        <a onClick={() => setActiveTab("Űrlapok")}>Űrlapok</a>
      </li>,
    ],
    felhasznalo: [
      <li>
        <a onClick={() => setActiveTab("Űrlapok")}>Űrlapok</a>
      </li>,
      <li>
        <a onClick={() => setActiveTab("Új űrlap")}>Új űrlap</a>
      </li>,
      <li>
        <a onClick={() => setActiveTab("Értesítések")}>
          Értesítések
          {hasNotification && (
            <span className="notification-icon" style={{ marginLeft: "5px" }}>
              ⚠️
            </span>
          )}
        </a>
      </li>,
      <li>
        <a onClick={() => setActiveTab("Profil")}>Profil</a>
      </li>,
    ],
  });

  return (
    <div className="relative">
      {/* Particles háttér */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        color="#ffffff"
        size={0.4}
        staticity={60}
        ease={40}
        refresh={false}
      />
      {/* Navbar tartalom */}
      <div
        className="navbar relative z-10"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Átlátszó háttér a navbaron
          color: "white",
          fontFamily: "Newsreader",
          fontSize: "18px",
        }}
      >
        <div className="w-11 rounded">
          <img src="Logo.png" alt="logo" />
        </div>
        <a className="text-xl font-newsreader">Ebösszeíró</a>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {szervezet
              ? navbarOptions.szervezet.map((option) => option)
              : navbarOptions.felhasznalo.map((option) => option)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
