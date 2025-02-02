import React from "react";
import { Link } from "react-router-dom";

const Bejelentkezes = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Link to={"/"}>
        <button className="btn btn-sm absolute right-4 top-5 text-white font-newsreader">Vissza a kezdőlapra</button>
      </Link>
      <div className="bg-gray-400 border border-black p-10 rounded-2xl shadow-lg w-[600px] h-[450px] relative">
        <div className="absolute top-4 right-4 w-12 translate-y-4 m-1">
          <img src="Logo.png" alt="logo" />
        </div>

        <h2 className="text-3xl font-bold mb-1 text-black">Bejelentkezés</h2>
        <p className="text-1xl mb-12 text-black">az alkalmazásba</p>

        <form>
          <div className="mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
              type="email"
              placeholder="szeretemAférfiakat@gmail.com"
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
              type="password"
              placeholder="Jelszó"
              required
            />
          </div>

          <button className="w-full p-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800">Bejelentkezés</button>
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
