import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Regisztracio = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Jelszó láthatóságának váltása
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Irányítószám alapján település lekérése
  const fetchCityByZipCode = async (zip) => {
    try {
      const response = await fetch(`https://hur.webmania.cc/zips/${zip}.json`);
      const data = await response.json();
      if (data.zips && data.zips.length > 0) {
        setCity(data.zips[0].name); // Az első találat településének beállítása
      } else {
        setCity(""); // Ha nincs találat, üresen hagyjuk
      }
    } catch (error) {
      console.error("Hiba a település lekérésekor:", error);
    }
  };

  // Irányítószám változásának kezelése
  const handleZipCodeChange = (e) => {
    const zip = e.target.value;
    setZipCode(zip);
    if (zip.length === 4) {
      fetchCityByZipCode(zip);
    } else {
      setCity("");
    }
  };

  // Telefonszám formázása
  const formatPhoneNumber = (input) => {
    const numbers = input.replace(/\D/g, ""); // Csak számok megtartása
    let formatted = "";
    if (numbers.length > 0) {
      formatted += numbers.substring(0, 2); // Első két szám
    }
    if (numbers.length > 2) {
      formatted += "/" + numbers.substring(2, 5); // Következő három szám
    }
    if (numbers.length > 5) {
      formatted += "-" + numbers.substring(5, 9); // Utolsó négy szám
    }
    return formatted;
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("A jelszavak nem egyeznek!");
      return;
    }

    const address = `${zipCode}, ${city}, ${street}`; // Cím összeállítása

    const response = await fetch("http://localhost:8000/felhasznalok/regisztracio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tulajdonosEmail: email,
        tulajdonosNeve: username,
        tulajdonosCim: address,
        tulajdonosTel: phone,
        jelszo: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      navigate("/Bejelentkezés");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-sm">
      <Link to={"/"}>
        <button className="btn btn-sm absolute right-4 top-5 text-white font-newsreader">Vissza a kezdőlapra</button>
      </Link>

      <div className="bg-gray-400 border border-black p-12 rounded-2xl shadow-lg w-[600px] relative">
        <div className="absolute top-4 right-4 w-14 translate-y-6">
          <img src="LogoBlack.png" alt="logo" />
        </div>

        <h2 className="text-3xl font-bold mb-1 text-black">Regisztráció</h2>
        <p className="text-md mb-6 text-black">a kezdéshez</p>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
              type="text"
              placeholder="Felhasználónév"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
              type="text"
              placeholder="Irányítószám"
              value={zipCode}
              onChange={handleZipCodeChange}
              maxLength={4}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
              type="text"
              placeholder="Település"
              value={city}
              readOnly
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
              type="text"
              placeholder="Utca, házszám"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
              type="text"
              placeholder="Telefonszám"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={12}
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={togglePasswordVisibility}
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
          <div className="mb-4 relative">
            <input
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Jelszó megerősítése"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={togglePasswordVisibility}
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

          <div className="flex items-center mb-6">
            <input type="checkbox" id="terms" className="mr-2" required />
            <label htmlFor="terms" className="text-sm text-black select-none">
              Elfogadom a feltételeinket
            </label>
          </div>

          <button type="submit" className="w-full p-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800">Folytatás</button>
        </form>

        <p className="text-center text-sm mt-4 text-black">
          Már regisztráltál?{" "}
          <Link to={"/Bejelentkezés"} className="font-bold cursor-pointer hover:underline">
            Bejelentkezés
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Regisztracio;