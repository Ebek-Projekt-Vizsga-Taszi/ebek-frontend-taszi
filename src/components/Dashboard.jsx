import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Urlapok from "./navbarcomponents/Urlapok";
import Ujurlap from "./navbarcomponents/Ujurlap";
import Ertesitesek from "./navbarcomponents/Ertesitesek";
import Profil from "./navbarcomponents/Profil";
import { startNotificationTimer } from "./navbarcomponents/Timer";
import Background from "../components/Background";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Űrlapok");
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    startNotificationTimer(setHasNotification);
  }, []);

  // Animációk konfigurációja
  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.25, 
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      y: -5,
      transition: { 
        duration: 0.2, 
        ease: "easeIn" 
      } 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const getTabComponent = () => {
    switch(activeTab) {
      case "Űrlapok": return <Urlapok />;
      case "Új űrlap": return <Ujurlap />;
      case "Értesítések": return <Ertesitesek />;
      case "Profil": return <Profil />;
      default: return <Urlapok />;
    }
  };

  return (
    <motion.div 
      className="relative min-h-screen bg-gray-50 dark:bg-gray-900"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Háttér komponens */}
      <Background />

      {/* Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        hasNotification={hasNotification} 
      />

      {/* Tartalom animációval */}
      <div className="mt-4 px-4 pb-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {getTabComponent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Dashboard;