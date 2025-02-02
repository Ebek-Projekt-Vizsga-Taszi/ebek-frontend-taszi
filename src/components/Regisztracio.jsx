import React from "react";
import { Link } from "react-router-dom";

const Regisztracio = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-sm">
      <Link to={"/"}>
        <button className="btn btn-sm absolute right-4 top-5 text-white font-newsreader">Vissza a kezdőlapra</button>
      </Link>

      <div className="bg-gray-400 border border-black p-12 rounded-2xl shadow-lg w-[600px] relative">
        <div className="absolute top-4 right-4 w-14 translate-y-6">
          <img src="Logo.png" alt="logo" />
        </div>

        <h2 className="text-3xl font-bold mb-1 text-black">Regisztráció</h2>
        <p className="text-md mb-6 text-black">a kezdéshez</p>

        <form>
          <div className="mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
              type="text"
              placeholder="Felhasználónév"
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
              type="email"
              placeholder="itsnaeemanjum@gmail.com"
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
              type="password"
              placeholder="Jelszó"
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
              type="password"
              placeholder="Jelszó megerősítése"
              required
            />
          </div>

          <div className="flex items-center mb-6">
            <input type="checkbox" id="terms" className="mr-2" required />
            <label htmlFor="terms" className="text-sm text-black select-none">
              Elfogadom a feltételeinket
            </label>
          </div>

          <button className="w-full p-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800">Folytatás</button>
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
