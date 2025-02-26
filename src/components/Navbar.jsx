import React, { useState } from "react";
import { Particles } from "./navbarcomponents/Design/Particles";
import { motion } from "framer-motion";

const Navbar = ({ activeTab, setActiveTab, hasNotification }) => {
  const [szervezet, setSzervezet] = useState(false);

  const navbarOptions = {
    szervezet: [
      { name: "Űrlapok", tab: "Űrlapok" },
    ],
    felhasznalo: [
      { name: "Űrlapok", tab: "Űrlapok" },
      { name: "Új űrlap", tab: "Új űrlap" },
      { name: "Értesítések", tab: "Értesítések", hasNotification },
      { name: "Profil", tab: "Profil" },
    ],
  };

  const options = szervezet ? navbarOptions.szervezet : navbarOptions.felhasznalo;

  return (
    <div className="relative">
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        color="#ffffff"
        size={0.4}
        staticity={60}
        ease={40}
        refresh={false}
      />
      <div
        className="sticky top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6"
        style={{
          maxWidth: "800px",
          width: "100%",
          padding: "0 16px",
          marginTop: "16px",
          userSelect: "none", // Itt tiltjuk le a kijelölést
        }}
      >
        <div
          className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg"
          style={{
            backgroundColor: "rgba(29, 35, 42)",
            borderColor: "white",
            backdropFilter: "blur(1px)",
          }}
        >
          <div className="flex items-center">
            <div className="w-11 rounded">
              <img src="Logo.png" alt="logo" />
            </div>
            <a className="text-xl font-newsreader ml-2">Ebösszeíró</a>
          </div>

          <div className="flex items-center gap-3">
            {options.map((option) => {
              const isActive = activeTab === option.tab;

              return (
                <motion.div
                  key={option.tab}
                  onClick={() => setActiveTab(option.tab)} // onClick eseménykezelő
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                    "text-foreground/80 hover:text-white",
                    isActive && "bg-muted text-white"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ userSelect: "none" }} // Itt is tiltjuk le a kijelölést
                >
                  <span>{option.name}</span>
                  {option.hasNotification && (
                    <span className="notification-icon" style={{ marginLeft: "5px" }}>
                      ⚠️
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full bg-white/5 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                        <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}