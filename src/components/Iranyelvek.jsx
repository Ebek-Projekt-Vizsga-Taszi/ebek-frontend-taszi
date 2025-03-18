import React from "react";
import { Link } from "react-router-dom";

const Iranyelvek = () => {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl p-4">
        <h1 className="text-2xl font-bold translate-y-5 text-center">Adatvédelmi irányelvek</h1>
        <button className="btn btn-sm absolute right-4 top-5 text-white font-newsreader">
          <Link to={"/"}>Vissza a kezdőlapra</Link>
        </button>
      </div>
      <div className="translate-y-10 text-white w-full max-w-4xl p-4">
        <p className="text-left">Tisztelt Látogatónk!</p>
        <br />
        <div className="flex flex-col space-y-3 text-sm">
          <p>Amikor Ön az Ebösszeírő internetes honlapját látogatja, eközben személyes adatait is átadja számunkra.</p>
          <p>
            Személyes adatai (vagyis azok az adatok, amelyek az Ön személyével kapcsolatba hozhatók) a következő módon kerülhetnek a kezelésünkbe:
            egyfelől az internetes kapcsolat fenntartásával összefüggésben az Ön által használt számítógéppel, böngészőprogrammal, internetes címmel,
            a látogatott oldalakkal kapcsolatos technikai adatok automatikusan képződnek számítógépes rendszerünkben, másfelől Ön is megadhatja nevét,
            elérhetőségét vagy más adatait, ha a honlap használata során személyes kapcsolatba kíván lépni velünk.
          </p>
          <p>
            Honlapunkat úgy alakítottuk ki, hogy az megfeleljen a vonatkozó jogszabályok tartalmi és formai követelményeinek. Ennek során arra
            törekedtünk, hogy az Ön személyes adatainak kezelése csak a honlap szolgáltatásainak igénybevételéhez szükséges mértékben, illetve az Ön
            rendelkezésének megfelelően, egyúttal a hatályos törvényi rendelkezések maradéktalan betartásával történjen.
          </p>
          <p>Honlapunk látogatása során az Ön adatainak felelős kezelője az Ebösszeírő.</p>
          <p>A honlap üzemeltetését az Ebösszeírő látja el.</p>
          <p>
            Az Ön adatait, amelyek a honlapunk látogatásával összefüggésben kerülnek kezelésünkbe, kizárólag mi ismerhetjük meg, azokat nem adjuk
            tovább.
          </p>
          <p>
            A honlap látogatásával összefüggésben kezelt adataihoz kizárólag saját és a honlap üzemeltetőjének munkatársai, feladatuk ellátásához,
            illetve az Ön által igénybe vett szolgáltatás teljesítéséhez, esetleges kérdésének, észrevételének megválaszolásához szükséges mértékben
            férnek hozzá.
          </p>
          <p>
            Kérdéseit, véleményét vagy észrevételeit megoszthatja velünk e-mailben, az Ebösszeírő hivatalos központi postafiók címén:
            info@Ebösszeírő.hu. Ebben az esetben meg kell adnia nevét és elektronikus postacímét (email). Kérdéséhez, véleményéhez külön fájlt is
            csatolhat. A tájékoztatást, intézkedést igénylő esetekben adatait eljuttatjuk az illetékes szervezeti egységünkhöz és válaszukkal
            megkeressük Önt.
          </p>
          <p>
            Ez a tájékoztató a honlapunkkal kapcsolatos adatvédelmi információkat tartalmazza. Látogatóink személyes adatainak kezelése csak részét
            képezi adatkezelési tevékenységünknek. Az Ebösszeírő más tevékenységei során is kapcsolatba kerül az állampolgárokkal, ügyfelekkel,
            melynek során kezeli az érintettek személyes adatait – erről adatvédelmi szabályzatunk szól.
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
            Adatainak védelme érdekében lehetősége van bírósághoz fordulni, amely az ügyben soron kívül jár el. Ebben az esetben szabadon eldöntheti,
            hogy a lakóhelye (állandó lakcím) vagy a tartózkodási helye (ideiglenes lakcím), illetve az adatkezelő székhelye szerint illetékes
            törvényszéknél nyújtja-e be keresetét. A lakóhelye vagy tartózkodási helye szerinti törvényszéket megkeresheti a
            http://birosag.hu/ugyfelkapcsolati-portal/birosag-kereso oldalon.
          </p>
          <p>Vonatkozó szabályozók:</p>
          <ul>
            <li>Magyarország Alaptörvénye VI. cikk (2)</li>
            <li>2010. évi CXXX. törvény a jogalkotásról</li>
            <li>2011. évi CXII. törvény az információs önrendelkezési jogról és az információszabadságról</li>
            <li>1992. évi LXVI. törvény a polgárok személyi adatainak és lakcímének nyilvántartásáról</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Iranyelvek;
