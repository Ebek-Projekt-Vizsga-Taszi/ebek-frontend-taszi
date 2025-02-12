import React from 'react';

const Navbar = ({ setActiveTab, hasNotification }) => {
  return (
    <div className="navbar" style={{ backgroundColor: 'white', color: 'black', fontFamily: 'Newsreader', fontSize: '18px' }}>
      <div className="w-11 rounded">
        <img src="Logo.png" alt="logo" />
      </div>
      <a className="text-xl font-newsreader">Ebösszeíró</a>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a onClick={() => setActiveTab("Űrlapok")}>Űrlapok</a>
          </li>
          <li>
            <a onClick={() => setActiveTab("Új űrlap")}>Új űrlap</a>
          </li>
          <li>
            <a onClick={() => setActiveTab("Értesítések")}>
              Értesítések
              {hasNotification && <span className="notification-icon" style={{ marginLeft: '5px' }}>⚠️</span>}
            </a>
          </li>
          <li>
            <a onClick={() => setActiveTab("Profil")}>Profil</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
