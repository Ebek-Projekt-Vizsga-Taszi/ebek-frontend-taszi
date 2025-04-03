import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Background from "../components/Background";

const Bejelentkezes = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/felhasznalok/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tulajdonosEmail: formData.email,
          jelszo: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Bejelentkezési hiba");
      }

      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      navigate("/Dashboard");
    } catch (err) {
      setError(err.message);
      console.error("Bejelentkezési hiba:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Background />
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg w-full max-w-md p-8">
          <Link to="/" className="absolute right-4 top-4">
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Vissza a kezdőlapra
            </button>
          </Link>

          <div className="flex justify-center mb-4">
            <img src="LogoBlack.png" alt="logo" className="h-12" />
          </div>

          <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">Bejelentkezés</h2>
          <p className="text-gray-600 text-center mb-6">az alkalmazásba</p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-6 relative">
              <input
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Jelszó"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Jelszó elrejtése" : "Jelszó megjelenítése"}
              >
                {showPassword ? (
                  <EyeOffIcon />
                ) : (
                  <EyeIcon />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Bejelentkezés..." : "Bejelentkezés"}
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-600">
            Még nem regisztrált?{" "}
            <Link to="/Regisztracio" className="font-semibold text-blue-600 hover:underline">
              Regisztráció
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Ikon komponensek
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);

export default Bejelentkezes;