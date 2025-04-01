import React, { useState } from "react";
import { Particles } from "./navbarcomponents/Design/Particles";
import { motion, AnimatePresence } from "framer-motion";

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

  // Animációs változók
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      backgroundColor: "rgba(255, 255, 255, 0.1)"
    },
    tap: { 
      scale: 0.95,
      backgroundColor: "rgba(255, 255, 255, 0.2)"
    }
  };

  const activeIndicatorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <div className="relative">
      {/* Háttér Particles */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        color="#ffffff"
        size={0.4}
        staticity={60}
        ease={40}
        refresh={false}
      />

      {/* Navigációs sáv */}
      <motion.div
        className="sticky top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6"
        style={{
          maxWidth: "800px",
          width: "100%",
          padding: "0 16px",
          marginTop: "16px",
          userSelect: "none",
        }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg"
          style={{
            backgroundColor: "rgba(29, 35, 42, 0.8)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          }}
          whileHover={{ 
            backgroundColor: "rgba(29, 35, 42, 0.9)",
            borderColor: "rgba(255, 255, 255, 0.2)"
          }}
        >
          {/* Logo és cím */}
          <motion.div 
            className="flex items-center"
            variants={itemVariants}
          >
            <motion.div 
              className="w-11 rounded"
              whileHover={{ rotate: 5 }}
              whileTap={{ rotate: -5 }}
            >
              <img src="Logo.png" alt="logo" />
            </motion.div>
            <motion.a 
              className="text-xl font-newsreader ml-2"
              whileHover={{ scale: 1.05 }}
            >
              Ebösszeíró
            </motion.a>
          </motion.div>

          {/* Navigációs opciók */}
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {options.map((option) => {
                const isActive = activeTab === option.tab;

                return (
                  <motion.div
                    key={option.tab}
                    onClick={() => setActiveTab(option.tab)}
                    className={cn(
                      "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                      "text-foreground/80 hover:text-white",
                      isActive && "text-white"
                    )}
                    variants={itemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    style={{ userSelect: "none" }}
                  >
                    <span>{option.name}</span>
                    
                    {/* Értesítés ikon */}
                    {option.hasNotification && (
                      <motion.span 
                        className="notification-icon absolute -top-1 -right-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      </motion.span>
                    )}
                    
                    {/* Aktív lap indikátor */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 w-full bg-white/10 rounded-full -z-10"
                        variants={activeIndicatorVariants}
                      >
                        <motion.div 
                          className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full"
                          variants={activeIndicatorVariants}
                        >
                          <motion.div 
                            className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2"
                            animate={{
                              opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Navbar;

// CSS osztályok kombinálása
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}