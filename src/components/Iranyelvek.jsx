import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Iranyelvek = () => {
  // Animációs beállítások
  const kontenerAnimacio = {
    rejtett: { opacity: 0 },
    lathato: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.08
      }
    }
  };

  const elemAnimacio = {
    rejtett: { y: 20, opacity: 0 },
    lathato: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900"
      initial="rejtett"
      animate="lathato"
      variants={kontenerAnimacio}
    >
      <div className="w-full max-w-4xl p-4 relative">
        <motion.h1 
          className="text-3xl font-bold mb-8 text-center text-white"
          variants={elemAnimacio}
        >
          Adatvédelmi irányelvek
        </motion.h1>
        
        <motion.button
          className="absolute right-4 top-5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium"
          variants={elemAnimacio}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/">Vissza a kezdőlapra</Link>
        </motion.button>
      </div>

      <motion.div 
        className="w-full max-w-4xl p-6 bg-gray-800 rounded-xl shadow-lg"
        variants={kontenerAnimacio}
      >
        <motion.div 
          className="text-gray-200 space-y-4"
          variants={kontenerAnimacio}
        >
          <motion.p className="text-xl font-semibold" variants={elemAnimacio}>
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
              className="text-sm md:text-base leading-relaxed"
              variants={elemAnimacio}
            >
              {szoveg}
            </motion.p>
          ))}

          {/* Felsorolás */}
          <motion.ul className="list-disc pl-6 space-y-2" variants={elemAnimacio}>
            {[
              "Magyarország Alaptörvénye VI. cikk (2)",
              "2010. évi CXXX. törvény a jogalkotásról",
              "2011. évi CXII. törvény az információs önrendelkezési jogról és az információszabadságról",
              "1992. évi LXVI. törvény a polgárok személyi adatainak és lakcímének nyilvántartásáról"
            ].map((pont, index) => (
              <motion.li 
                key={index}
                variants={elemAnimacio}
                className="text-sm md:text-base"
              >
                {pont}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Iranyelvek;