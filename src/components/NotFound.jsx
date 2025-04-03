import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Background from "../components/Background";

const NotFound = () => {
  // Animációs beállítások
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.03, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      className="relative min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Background />
      
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div 
          className="text-center max-w-md"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-8xl font-bold text-gray-800 dark:text-white mb-4"
            variants={itemVariants}
          >
            404
          </motion.h1>
          
          <motion.h2 
            className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6"
            variants={itemVariants}
          >
            Az oldal nem található
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 dark:text-gray-400 mb-8"
            variants={itemVariants}
          >
            Sajnáljuk, de a keresett oldal nem található. Lehet, hogy eltávolították, átnevezték, vagy ideiglenesen nem elérhető.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <Link to="/">
              <motion.button
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Vissza a kezdőlapra
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;