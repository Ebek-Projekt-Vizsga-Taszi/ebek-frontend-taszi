import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  // Animációs változók
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="bg-[url('/BackgroundPic.png')] bg-cover bg-center h-screen w-full overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Fejléc */}
      <motion.div className="flex items-center p-4" variants={itemVariants}>
        <div className="avatar mr-4">
          <motion.div className="w-11 rounded" whileHover={{ rotate: 10 }}>
            <img src="LogoBlack.png" alt="logo" />
          </motion.div>
        </div>
        <motion.a className="text-lg text-black font-newsreader" whileHover={{ scale: 1.05 }}>
          Ebösszeíró
        </motion.a>
      </motion.div>

      {/* Fő szöveg */}
      <motion.div className="absolute left-0 top-1/2 transform -translate-y-36 p-6 text-black font-newsreader" variants={containerVariants}>
        {["Túl sokáig tart bejelenteni a kutyáit?", "Velünk mindössze 5 perc,", "és legközelebb elég pár kattintás!"].map((text, index) => (
          <motion.p key={index} className="text-2xl mb-2" variants={itemVariants}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      {/* Gombok */}
      <motion.div className="absolute left-0 top-2/3 transform p-6 text-black font-newsreader flex space-x-9" variants={containerVariants}>
        <Link to="/Bejelentkezés">
          <motion.button
            className="btn w-36 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Bejelentkezés
          </motion.button>
        </Link>
        <Link to="/Regisztracio">
          <motion.button
            className="btn w-36 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Regisztráció
          </motion.button>
        </Link>
      </motion.div>

      {/* Lábléc */}
      <motion.div className="absolute bottom-0 left-0 w-full p-4" variants={itemVariants}>
        <Link to="/Iranyelvek">
          <motion.button className="text-white hover:underline" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Adatvédelmi irányelvek
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
