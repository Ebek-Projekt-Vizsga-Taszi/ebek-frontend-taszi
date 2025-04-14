// Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Background from "./Background";

// Leképezés a dashboard aloldalak route neveire
const tabToRoute = {
  "Űrlapok": "Urlapok",
  "Új űrlap": "UjUrlap",
  "Értesítések": "Ertesitesek",
  "Profil": "Profil"
};

const Navbar = ({ activeTab, setActiveTab, hasNotification }) => {
  const [szervezet] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // A felhasználói (nem szervezeti) menü opciók
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

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    closed: {
      opacity: 0,
      y: -20,
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
              <img src="/public/Logo.png" alt="logo" className="w-full h-full object-contain" />
            </motion.div>
            <motion.h1 
              className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block"
              whileHover={{ scale: 1.02 }}
            >
              Ebösszeíró
            </motion.h1>
          </motion.div>

          {/* Mobil menü gomb */}
          <motion.button
            className="sm:hidden p-2 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>

          {/* Asztali navigációs opciók */}
          <motion.div 
            className="hidden sm:flex items-center gap-1"
            variants={containerVariants}
          >
            <AnimatePresence mode="wait">
              {options.map((option) => {
                const isActive = activeTab === option.tab;
                return (
                  <Link key={option.tab} to={`/Dashboard/${tabToRoute[option.tab]}`}>
                    <motion.button
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
                  </Link>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Mobil menü */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="sm:hidden mt-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              {options.map((option) => {
                const isActive = activeTab === option.tab;
                return (
                  <Link key={option.tab} to={`/Dashboard/${tabToRoute[option.tab]}`}>
                    <motion.button
                      onClick={() => {
                        setActiveTab(option.tab);
                        setIsMenuOpen(false);
                      }}
                      className={`relative w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                        isActive 
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30" 
                          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      }`}
                      variants={itemVariants}
                      whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center">
                        {option.name}
                        {option.hasNotification && (
                          <motion.span 
                            className="ml-2 w-2 h-2 bg-red-500 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          />
                        )}
                      </span>
                    </motion.button>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Navbar;
