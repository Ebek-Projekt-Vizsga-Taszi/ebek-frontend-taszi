import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeStatus, setPasswordChangeStatus] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:8000/felhasznalok/tulajdonos-adatok", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Hiba történt a lekérés során");

        const data = await res.json();

        setUserData({
          name: data.tulajdonosNeve,
          email: data.tulajdonosEmail,
        });
        setLoading(false);
      } catch (err) {
        console.error("Hiba az adatok lekérésekor:", err);
        setError("Hiba történt az adatok lekérésekor");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordChangeStatus("Az új jelszó és a megerősítés nem egyezik!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/felhasznalok/jelszo-valtoztatas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setPasswordChangeStatus("Jelszó sikeresen megváltoztatva!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordChangeStatus(data.message || "Hiba történt a jelszó módosításakor");
      }
    } catch (err) {
      console.error("Hiba a jelszó módosításakor:", err);
      setPasswordChangeStatus("Hiba történt a jelszó módosításakor");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) return <div className="text-white p-4">Betöltés...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Profil Információk</h2>
      <div className="mb-6 text-white">
        <p><strong>Név:</strong> {userData.name}</p>
        <p><strong>E-mail:</strong> {userData.email}</p>
      </div>

      <button
        onClick={handleLogout}
        className="mb-8 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Kijelentkezés
      </button>

      <h2 className="text-3xl font-bold mb-4">Jelszó módosítása</h2>
      {passwordChangeStatus && (
        <div className={`mb-4 p-2 rounded ${
          passwordChangeStatus.includes("sikeresen") ? "bg-green-500" : "bg-red-500"
        } text-white`}>
          {passwordChangeStatus}
        </div>
      )}
      <form onSubmit={handlePasswordChange}>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="text-white block">Jelenlegi jelszó:</label>
          <input
            id="currentPassword"
            type="password"
            className="w-full p-2 border rounded"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="text-white block">Új jelszó:</label>
          <input
            id="newPassword"
            type="password"
            className="w-full p-2 border rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="text-white block">Jelszó megerősítése:</label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full p-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Jelszó mentése
        </button>
      </form>
    </div>
  );
};

export default Profil;
