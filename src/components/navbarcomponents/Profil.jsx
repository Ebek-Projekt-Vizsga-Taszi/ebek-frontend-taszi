import React, { useState } from "react";

const Profil = () => {
  // Felhasználói adatok (példa)
  const [userData, setUserData] = useState({
    name: "Kovács János", // Példa név
    email: "kovacs.janos@example.com", // Példa e-mail
  });

  // Jelszó módosítás állapotai
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Jelszó módosítás kezelése
  const handlePasswordChange = (e) => {
    e.preventDefault();

    // Jelszavak ellenőrzése
    if (newPassword !== confirmPassword) {
      alert("Az új jelszó és a megerősítés nem egyezik!");
      return;
    }

    // Jelszó módosítás logikája (pl. API hívás)
    // console.log("Jelszó módosítása:", { currentPassword, newPassword });

    // Mezők ürítése
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="container mx-auto p-4">
      {/* Felhasználói adatok */}
      <h2 className="text-3xl font-bold mb-4">Profil Információk</h2>
      <div className="mb-6">
        <p className="text-white">
          <strong>Név:</strong> {userData.name}
        </p>
        <p className="text-white">
          <strong>E-mail cím:</strong> {userData.email}
        </p>
      </div>

      {/* Jelszó módosítás */}
      <h2 className="text-3xl font-bold mb-4 mt-8">Jelszó módosítása</h2>
      <form onSubmit={handlePasswordChange}>
        <div className="mb-4">
          <label className="block text-white" htmlFor="currentPassword">
            Jelenlegi jelszó:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white" htmlFor="newPassword">
            Új jelszó:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white" htmlFor="confirmPassword">
            Jelszó megerősítése:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Jelszó mentése
        </button>
      </form>
    </div>
  );
};

export default Profil;