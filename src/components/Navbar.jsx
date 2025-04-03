import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Background from "./Background";

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

  // Animációs beállítások
  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    hover: { 
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      scale: 1.03
    },
    tap: { 
      scale: 0.98,
      backgroundColor: "rgba(255, 255, 255, 0.1)"
    }
  };

  const activeIndicatorVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <div className="relative">
      <Background />
      
      <motion.div
        className="sticky top-0 z-50 w-full py-4 px-4 sm:px-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="max-w-6xl mx-auto flex items-center justify-between bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 shadow-sm"
          variants={containerVariants}
        >
          {/* Logo és cím */}
          <motion.div 
            className="flex items-center"
            variants={itemVariants}
          >
            <motion.div 
              className="w-10 h-10 rounded-lg overflow-hidden mr-3"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="Logo.png" alt="logo" className="w-full h-full object-contain" />
            </motion.div>
            <motion.h1 
              className="text-xl font-bold text-gray-800 dark:text-white"
              whileHover={{ scale: 1.02 }}
            >
              Ebösszeíró
            </motion.h1>
          </motion.div>

          {/* Navigációs opciók */}
          <motion.div 
            className="flex items-center gap-1"
            variants={containerVariants}
          >
            <AnimatePresence mode="wait">
              {options.map((option) => {
                const isActive = activeTab === option.tab;
                
                return (
                  <motion.button
                    key={option.tab}
                    onClick={() => setActiveTab(option.tab)}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive 
                        ? "text-blue-600 dark:text-blue-400" 
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    }`}
                    variants={itemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <span className="relative z-10">
                      {option.name}
                      {option.hasNotification && (
                        <motion.span 
                          className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        />
                      )}
                    </span>
                    
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                        variants={activeIndicatorVariants}
                        layoutId="activeIndicator"
                      />
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Navbar;