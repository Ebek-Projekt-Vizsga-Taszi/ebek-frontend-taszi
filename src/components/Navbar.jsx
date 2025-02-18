import React, { useState } from 'react';

const Navbar = ({ setActiveTab, hasNotification }) => {
    // indikáljuk a szervezeti navbart
    const [szervezet, setSzervezet] = useState(true);
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
            {hasNotification && <span className="notification-icon" style={{ marginLeft: '5px' }}>⚠️</span>}
          </a>
        </li>,
        <li>
          <a onClick={() => setActiveTab("Profil")}>Profil</a>
        </li>
      ]
    }) 
  return (
    <div className="navbar" style={{ backgroundColor: 'white', color: 'black', fontFamily: 'Newsreader', fontSize: '18px' }}>
      <div className="w-11 rounded">
        <img src="Logo.png" alt="logo" />
      </div>
      <a className="text-xl font-newsreader">Ebösszeíró</a>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {
            szervezet ? navbarOptions.szervezet.map(option => (option))
            : navbarOptions.felhasznalo.map(option => (option))
          }
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
