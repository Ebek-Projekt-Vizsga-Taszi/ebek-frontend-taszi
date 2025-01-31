import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-[url('/BackgroundPic.png')] bg-cover bg-center h-screen w-full">
      <div className="flex items-center p-4">
        <div className="avatar mr-4">
          <div className="w-11 rounded">
            <img src="Logo.png" alt="logo" />
          </div>
        </div>
        <a className="text-lg text-black font-newsreader">Ebösszeíró</a>
      </div>
      <div className="absolute left-0 top-1/2 transform -translate-y-36 p-6 text-black font-newsreader">
        <p className="text-2xl">Túl sokáig tart bejelenteni a kutyáit?</p>
        <p className="text-2xl">Velünk mindössze 5 perc,</p>
        <p className="text-2xl">és legközelebb elég pár kattintás!</p>
      </div>
      <div className="absolute left-0 top-2/3 transform p-6 text-black font-newsreader flex space-x-9">
        <Link to={"/Bejelentkezés"} className="btn w-36 rounded-full">
          <button>Bejelentkezés</button>
        </Link>
        <Link to={"/Regisztracio"} className="btn w-36 rounded-full">
          <button>Regisztráció</button>
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 w-full  p-4 flex justify-around">
        <Link to={"/Iranyelvek"} className="absolute left-2 top-24 transform -translate-y-36 p-6 text-white">
          <button>Adatvédelmi irányelvek</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
