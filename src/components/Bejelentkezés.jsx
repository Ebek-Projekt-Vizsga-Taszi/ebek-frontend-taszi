import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Bejelentkezes = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <div className="mb-6">
            <input
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
              type="password"
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
