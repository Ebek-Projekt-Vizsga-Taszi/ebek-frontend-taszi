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
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.03, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div className="relative min-h-screen" initial="hidden" animate="visible" variants={containerVariants}>
      <Background />

      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div className="w-full max-w-4xl relative" variants={itemVariants}>
          {/* Vissza gomb */}
          <motion.div className="absolute right-0 top-0" variants={itemVariants}>
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
          <motion.h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white" variants={itemVariants}>
            Adatvédelmi irányelvek
          </motion.h1>
        </motion.div>

        {/* Tartalom */}
        <motion.div
          className="w-full max-w-4xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8"
          variants={containerVariants}
        >
          <motion.div className="prose prose-gray dark:prose-invert max-w-none" variants={containerVariants}>
            <motion.p className="text-lg font-semibold" variants={itemVariants}>
              Tisztelt Látogatónk!
            </motion.p>

            {/* Szöveges bekezdések */}
            <motion.div className="flex flex-col space-y-3 text-sm" variants={itemVariants}>
              <p>Amikor Ön az Ebösszeírő internetes honlapját látogatja, eközben személyes adatait is átadja számunkra.</p>
              <p>
                Személyes adatai (vagyis azok az adatok, amelyek az Ön személyével kapcsolatba hozhatók) a következő módon kerülhetnek a kezelésünkbe:
                egyfelől az internetes kapcsolat fenntartásával összefüggésben az Ön által használt számítógéppel, böngészőprogrammal, internetes
                címmel, a látogatott oldalakkal kapcsolatos technikai adatok automatikusan képződnek számítógépes rendszerünkben, másfelől Ön is
                megadhatja nevét, elérhetőségét vagy más adatait, ha a honlap használata során személyes kapcsolatba kíván lépni velünk.
              </p>
              <p>
                Honlapunkat úgy alakítottuk ki, hogy az megfeleljen a vonatkozó jogszabályok tartalmi és formai követelményeinek. Ennek során arra
                törekedtünk, hogy az Ön személyes adatainak kezelése csak a honlap szolgáltatásainak igénybevételéhez szükséges mértékben, illetve az
                Ön rendelkezésének megfelelően, egyúttal a hatályos törvényi rendelkezések maradéktalan betartásával történjen.
              </p>
              <p>Honlapunk látogatása során az Ön adatainak felelős kezelője az Ebösszeírő.</p>
              <p>A honlap üzemeltetését az Ebösszeírő látja el.</p>
              <p>
                Az Ön adatait, amelyek a honlapunk látogatásával összefüggésben kerülnek kezelésünkbe, kizárólag mi ismerhetjük meg, azokat nem adjuk
                tovább.
              </p>
              <p>Nem alkalmazunk automatizált döntéshozatalt vagy profilozást, amely jogi hatással lenne Önre.</p>
              <p>Adatvédelmi incidens esetén 72 órán belül értesítjük a Hatóságot és az érintetteket, ha magas kockázat áll fenn.</p>
              <p>
                Adatait csak EU-s országokban tároljuk. Kivételes esetben az EU szerződésalapú átviteli mechanizmusait (pl. Standard Szerződési
                Klauzulák) alkalmazzuk.
              </p>
              <p>
                Adatokat csak olyan harmadik félnek továbbítunk (pl. hosting szolgáltató), aki GDPR-kompatibilis. Külön tájékoztatást küldünk, ha új
                adatfeldolgozóval dolgozunk.
              </p>
              <p>
                Technikai adatokat (pl. IP-cím) 30 napig, kapcsolatfelvételi adatokat 1 évig tárolunk, hivatalos kötelezettségek (pl. könyvelési
                törvény) esetén a jogszabályban meghatározott ideig.
              </p>
              <p>
                A honlap látogatásával összefüggésben kezelt adataihoz kizárólag saját és a honlap üzemeltetőjének munkatársai, feladatuk ellátásához,
                illetve az Ön által igénybe vett szolgáltatás teljesítéséhez, esetleges kérdésének, észrevételének megválaszolásához szükséges
                mértékben férnek hozzá.
              </p>
              <p>
                Kérdéseit, véleményét vagy észrevételeit megoszthatja velünk e-mailben, az Ebösszeírő hivatalos központi postafiók címén:
                info@Ebösszeírő.hu. Ebben az esetben meg kell adnia nevét és elektronikus postacímét (email). Kérdéséhez, véleményéhez külön fájlt is
                csatolhat. A tájékoztatást, intézkedést igénylő esetekben adatait eljuttatjuk az illetékes szervezeti egységünkhöz és válaszukkal
                megkeressük Önt.
              </p>
              <p>
                Ez a tájékoztató a honlapunkkal kapcsolatos adatvédelmi információkat tartalmazza. Látogatóink személyes adatainak kezelése csak
                részét képezi adatkezelési tevékenységünknek. Az Ebösszeírő más tevékenységei során is kapcsolatba kerül az állampolgárokkal,
                ügyfelekkel, melynek során kezeli az érintettek személyes adatait – erről adatvédelmi szabályzatunk szól.
              </p>
              <p>Ha további tájékoztatást szeretne adatainak kezeléséről, forduljon hozzánk (elektronikus levélben, telefonon, postai úton stb.).</p>
              <p>Adatkezelő tisztviselő: Bencsik Andor</p>
              <p>E-mail: bencsik.andor@Ebösszeírő.hu</p>
              <p>Az adatkezeléssel kapcsolatos jogérvényesítési lehetősége:</p>
              <p>
                Ha Ön úgy ítéli meg, hogy az adatkezelő a személyes adatainak kezelése során megsértette a hatályos adatvédelmi követelményeket, akkor
                fordulhat az adatvédelmi tisztviselőhöz vagy panaszt nyújthat be a Hatósághoz.
              </p>
              <p>Nemzeti Adatvédelmi és Információszabadság Hatóság</p>
              <p>cím: Békéscsaba, Gyulai út 32, 5600,</p>
              <p>postacím: Békéscsaba, Gyulai út 32, 5600.</p>
              <p>E-mail: ugyfelszolgalat@naih.hu,</p>
              <p>honlap: www.naih.hu</p>
              <p>
                Adatainak védelme érdekében lehetősége van bírósághoz fordulni, amely az ügyben soron kívül jár el. Ebben az esetben szabadon
                eldöntheti, hogy a lakóhelye (állandó lakcím) vagy a tartózkodási helye (ideiglenes lakcím), illetve az adatkezelő székhelye szerint
                illetékes törvényszéknél nyújtja-e be keresetét. A lakóhelye vagy tartózkodási helye szerinti törvényszéket megkeresheti a
                http://birosag.hu/ugyfelkapcsolati-portal/birosag-kereso oldalon.
              </p>
              <p>Vonatkozó szabályozók:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Magyarország Alaptörvénye VI. cikk (2)</li>
                <li>2010. évi CXXX. törvény a jogalkotásról</li>
                <li>2011. évi CXII. törvény az információs önrendelkezési jogról és az információszabadságról</li>
                <li>1992. évi LXVI. törvény a polgárok személyi adatainak és lakcímének nyilvántartásáról</li>
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Iranyelvek;
