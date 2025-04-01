import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Background from "../components/Background";

const Iranyelvek = () => {
  // Animációs beállítások
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
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
    hover: { scale: 1.03, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
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
          className="w-full max-w-4xl relative"
          variants={itemVariants}
        >
          {/* Vissza gomb */}
          <motion.div
            className="absolute right-0 top-0"
            variants={itemVariants}
          >
            <Link to="/">
              <motion.button
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Vissza a kezdőlapra
              </motion.button>
            </Link>
          </motion.div>

          {/* Cím */}
          <motion.h1 
            className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white"
            variants={itemVariants}
          >
            Adatvédelmi irányelvek
          </motion.h1>
        </motion.div>

        {/* Tartalom */}
        <motion.div 
          className="w-full max-w-4xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8"
          variants={containerVariants}
        >
          <motion.div 
            className="prose prose-gray dark:prose-invert max-w-none"
            variants={containerVariants}
          >
            <motion.p className="text-lg font-semibold" variants={itemVariants}>
              Tisztelt Látogatónk!
            </motion.p>

            {/* Szöveges bekezdések */}
            {[
              "Amikor Ön az Ebösszeírő internetes honlapját látogatja, eközben személyes adatait is átadja számunkra.",
              "Személyes adatai (vagyis azok az adatok, amelyek az Ön személyével kapcsolatba hozhatók) a következő módon kerülhetnek a kezelésünkbe...",
              // ... minden egyéb szöveges bekezdés
              "Vonatkozó szabályozók:"
            ].map((szoveg, index) => (
              <motion.p 
                key={index}
                variants={itemVariants}
                className="mb-4 text-gray-700 dark:text-gray-300"
              >
                {szoveg}
              </motion.p>
            ))}

            {/* Felsorolás */}
            <motion.ul 
              className="space-y-2 pl-5 my-4"
              variants={itemVariants}
            >
              {[
                "Magyarország Alaptörvénye VI. cikk (2)",
                "2010. évi CXXX. törvény a jogalkotásról",
                "2011. évi CXII. törvény az információs önrendelkezési jogról és az információszabadságról",
                "1992. évi LXVI. törvény a polgárok személyi adatainak és lakcímének nyilvántartásáról"
              ].map((pont, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  className="text-gray-700 dark:text-gray-300"
                >
                  {pont}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Iranyelvek;