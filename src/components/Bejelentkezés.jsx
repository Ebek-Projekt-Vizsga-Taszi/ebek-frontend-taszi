import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Bejelentkezes = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Új állapot a jelszó láthatóságához

  const handleLogin = async (e) => {
    e.preventDefault();

    // Bejelentkezési API hívás
    const response = await fetch("http://localhost:8000/felhasznalok/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tulajdonosEmail: email,
        jelszo: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Bejelentkezési token:", data.token); // A token naplózása a konzolba, commentek nem maradnak sokáig, majd lehet törölni
      localStorage.setItem("token", data.token); // Token mentése a helyi tárolásba
      setIsAuthenticated(true);
      navigate("/Dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Link to={"/"}>
        <button className="btn btn-sm absolute right-4 top-5 text-white font-newsreader">Vissza a kezdőlapra</button>
      </Link>
      <div className="bg-gray-400 border border-black p-10 rounded-2xl shadow-lg w-[600px] h-[450px] relative">
        <div className="absolute top-4 right-4 w-12 translate-y-4 m-1">
          <img src="LogoBlack.png" alt="logo" />
        </div>

        <h2 className="text-3xl font-bold mb-1 text-black">Bejelentkezés</h2>
        <p className="text-1xl mb-12 text-black">az alkalmazásba</p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 relative">
            <input
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
              type={showPassword ? "text" : "password"} // Jelszó láthatóságának váltása
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={() => setShowPassword(!showPassword)} // Jelszó láthatóságának váltása
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>

          <button type="submit" className="w-full p-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800">Bejelentkezés</button>
        </form>

        <p className="text-center text-sm mt-4 text-black">
          Még nem regisztrált?{" "}
          <Link to={"/Regisztracio"} className="font-bold cursor-pointer hover:underline">
            Regisztráció
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Bejelentkezes;