import React, { useState, useEffect, useCallback } from "react";

const Step2 = ({ handleNext, handleBack }) => {
  const [formData, setFormData] = useState({
    ebHivoneve: "",
    ebTorzskonyviNeve: "",
    ebFajtaja: "",
    ebNeme: "Szuka",
    ebSzulIdeje: "",
    ebSzine: "",
    mikrochip: false,
    mikrochipSorszam: "",
    ivartalanitott: false,
    ivartalanitasIdopontja: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadSuccess, setLoadSuccess] = useState(false);

  // Mentett adatok betöltése a localStorage-ból
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formDataStep2"));
    if (savedData) {
      setFormData(prev => ({
        ...prev,
        ...savedData
      }));
    }
  }, []);

  // Mentett adatok betöltése a szerverről
  const loadSavedData = useCallback(async () => {
    setIsLoading(true);
    setLoadSuccess(false);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // console.log("Nincs token, kihagyjuk a szerverről történő betöltést");
        return;
      }

      const response = await fetch("http://localhost:8000/felhasznalok/step2-adatok", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Hiba: ${response.status}`);
      }

      const data = await response.json();
      
      // Frissítjük az állapotot a szerverről kapott adatokkal
      setFormData(prev => ({
        ...prev,
        ebHivoneve: data.ebHivoneve || "",
        ebTorzskonyviNeve: data.ebTorzskonyviNeve || "",
        ebFajtaja: data.ebFajtaja || "",
        ebNeme: data.ebNeme || "Szuka",
        ebSzulIdeje: data.ebSzulIdeje || "",
        ebSzine: data.ebSzine || "",
        mikrochip: data.mikrochip || false,
        mikrochipSorszam: data.mikrochipSorszam || "",
        ivartalanitott: data.ivartalanitott || false,
        ivartalanitasIdopontja: data.ivartalanitasIdopontja || "",
        oltasiKonyvSzam: data.oltasiKonyvSzam || ""
      }));

      // Mentjük localStorage-ba is a betöltött adatokat
      localStorage.setItem("formDataStep2", JSON.stringify({
        ...formData,
        ...data
      }));

      setLoadSuccess(true);
    } catch (error) {
      console.error("Hiba történt a mentett adatok betöltése közben:", error);
      setErrors({
        ...errors,
        loadError: "Nem sikerült betölteni a mentett adatokat"
      });
    } finally {
      setIsLoading(false);
    }
  }, []);


  // Mikrochip sorszám formázása (3-4-8 számjegy, szóközzel elválasztva)
  const formatMicrochipNumber = (input) => {
    const numbers = input.replace(/\D/g, "").substring(0, 15);
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.substring(0, 3)} ${numbers.substring(3)}`;
    return `${numbers.substring(0, 3)} ${numbers.substring(3, 7)} ${numbers.substring(7, 15)}`;
  };

  // Mikrochip sorszám validálása
  const validateMicrochipNumber = (number) => {
    const cleanNumber = number.replace(/\s/g, "");
    return cleanNumber.length === 15 && /^\d+$/.test(cleanNumber);
  };

  // Általános változáskezelő függvény
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      localStorage.setItem("formDataStep2", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  // Dátum formázása és korrekciója (xxxx.xx.xx)
  const handleDateChange = (e, fieldName) => {
    const input = e.target.value.replace(/\D/g, "");
    let formattedInput = "";

    // Év rész (4 számjegy)
    if (input.length > 0) {
      formattedInput += input.substring(0, 4);
    }

    // Hónap rész (2 számjegy, 01-12)
    if (input.length > 4) {
      const month = input.substring(4, 6);
      // Ha 00 van megadva, akkor 01-re állítjuk
      const correctedMonth = month === "00" ? "01" : parseInt(month) > 12 ? "12" : month.padStart(2, "0");
      formattedInput += "." + correctedMonth;
    }

    // Nap rész (2 számjegy, 01-31)
    if (input.length > 6) {
      const day = input.substring(6, 8);
      // Ha 00 van megadva, akkor 01-re állítjuk
      const correctedDay = day === "00" ? "01" : parseInt(day) > 31 ? "31" : day.padStart(2, "0");
      formattedInput += "." + correctedDay;
    }

    setFormData((prev) => {
      const updatedData = { ...prev, [fieldName]: formattedInput };
      localStorage.setItem("formDataStep2", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  // Mikrochip sorszám változáskezelő
  const handleMicrochipNumberChange = (e) => {
    const formattedValue = formatMicrochipNumber(e.target.value);
    setFormData((prev) => {
      const updatedData = { ...prev, mikrochipSorszam: formattedValue };
      localStorage.setItem("formDataStep2", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  // Checkbox változáskezelő függvény
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: checked };
      localStorage.setItem("formDataStep2", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  // Form érvényességének ellenőrzése
  const validateForm = () => {
    const newErrors = {};
    const { ebHivoneve, ebFajtaja, ebNeme, ebSzulIdeje, ebSzine, mikrochip, mikrochipSorszam, ivartalanitott, ivartalanitasIdopontja } = formData;

    // Kötelező mezők
    if (!ebHivoneve.trim()) newErrors.ebHivoneve = "Kötelező mező";
    if (!ebFajtaja.trim()) newErrors.ebFajtaja = "Kötelező mező";
    if (!ebSzulIdeje.trim()) newErrors.ebSzulIdeje = "Kötelező mező";
    if (!ebSzine.trim()) newErrors.ebSzine = "Kötelező mező";

    // Mikrochip validáció
    if (mikrochip) {
      if (!mikrochipSorszam) {
        newErrors.mikrochipSorszam = "Kötelező mező";
      } else if (!validateMicrochipNumber(mikrochipSorszam)) {
        newErrors.mikrochipSorszam = "15 számjegyből kell állnia (pl. 123 4567 89012345)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClickNext = useCallback(() => {
    if (validateForm()) {
      handleNext();
    }
  }, [formData, handleNext]);

  const handleClickBack = useCallback(() => {
    handleBack();
  }, [handleBack]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Eb adatai</h2>
       {/* Mentett adatok betöltése gomb és visszajelzés */}
       <div className="mb-4">
        <button
          type="button"
          onClick={loadSavedData}
          disabled={isLoading}
          className={`${isLoading ? "bg-gray-500" : "bg-green-500"} text-white py-2 px-4 rounded hover:bg-green-600 w-full sm:w-auto mb-2`}
        >
          {isLoading ? "Betöltés..." : "Mentett adatok betöltése"}
        </button>
        
        {loadSuccess && (
          <div className="p-2 bg-green-100 text-green-800 rounded">
            Sikeresen betöltöttük a mentett adatokat!
          </div>
        )}
        
        {errors.loadError && (
          <div className="p-2 bg-red-100 text-red-800 rounded">
            {errors.loadError}
          </div>
        )}
      </div>
      <form>
        {/* Eb hívóneve */}
        <div className="mb-4">
          <label htmlFor="ebHivoneve" className="block text-white font-newsreader mb-2">
            Eb hívóneve: *
          </label>
          <input
            id="ebHivoneve"
            className={`border ${errors.ebHivoneve ? "border-red-500" : "border-gray-300"} p-2 w-full text-white bg-grey`}
            type="text"
            name="ebHivoneve"
            placeholder="Hívónév"
            value={formData.ebHivoneve}
            onChange={handleChange}
          />
          {errors.ebHivoneve && <p className="text-red-500 text-sm mt-1">{errors.ebHivoneve}</p>}
        </div>

        {/* Eb törzskönyvi neve */}
        <div className="mb-4">
          <label htmlFor="ebTorzskonyviNeve" className="block text-white font-newsreader mb-2">
            Eb törzskönyvi neve: (Nem kötelező)
          </label>
          <input
            id="ebTorzskonyviNeve"
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="text"
            name="ebTorzskonyviNeve"
            placeholder="Törzskönyvi név"
            value={formData.ebTorzskonyviNeve}
            onChange={handleChange}
          />
        </div>

        {/* Eb fajtája */}
        <div className="mb-4">
          <label htmlFor="ebFajtaja" className="block text-white font-newsreader mb-2">
            Eb fajtája: *
          </label>
          <input
            id="ebFajtaja"
            className={`border ${errors.ebFajtaja ? "border-red-500" : "border-gray-300"} p-2 w-full text-white bg-grey`}
            type="text"
            name="ebFajtaja"
            placeholder="Fajta"
            value={formData.ebFajtaja}
            onChange={handleChange}
          />
          {errors.ebFajtaja && <p className="text-red-500 text-sm mt-1">{errors.ebFajtaja}</p>}
        </div>

        {/* Eb neme */}
        <div className="mb-4">
          <label htmlFor="ebNeme" className="block text-white font-newsreader mb-2">
            Eb neme: *
          </label>
          <select
            id="ebNeme"
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            name="ebNeme"
            value={formData.ebNeme}
            onChange={handleChange}
          >
            <option value="Szuka">Szuka</option>
            <option value="Kan">Kan</option>
          </select>
        </div>

        {/* Eb születési ideje */}
        <div className="mb-4">
          <label htmlFor="ebSzulIdeje" className="block text-white font-newsreader mb-2">
            Eb születési ideje: * (ÉÉÉÉ.HH.NN)
          </label>
          <input
            id="ebSzulIdeje"
            className={`border ${errors.ebSzulIdeje ? "border-red-500" : "border-gray-300"} p-2 w-full text-white bg-grey`}
            type="text"
            name="ebSzulIdeje"
            placeholder="ÉÉÉÉ.HH.NN"
            value={formData.ebSzulIdeje}
            onChange={(e) => handleDateChange(e, "ebSzulIdeje")}
          />
          {errors.ebSzulIdeje && <p className="text-red-500 text-sm mt-1">{errors.ebSzulIdeje}</p>}
        </div>

        {/* Eb színe */}
        <div className="mb-4">
          <label htmlFor="ebSzine" className="block text-white font-newsreader mb-2">
            Eb színe: *
          </label>
          <input
            id="ebSzine"
            className={`border ${errors.ebSzine ? "border-red-500" : "border-gray-300"} p-2 w-full text-white bg-grey`}
            type="text"
            name="ebSzine"
            placeholder="Szín"
            value={formData.ebSzine}
            onChange={handleChange}
          />
          {errors.ebSzine && <p className="text-red-500 text-sm mt-1">{errors.ebSzine}</p>}
        </div>

        {/* Mikrochip */}
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">
            <input 
              className="mr-2" 
              type="checkbox" 
              name="mikrochip" 
              checked={formData.mikrochip} 
              onChange={handleCheckboxChange} 
            />
            Eb rendelkezik mikrochippel
          </label>
          {formData.mikrochip && (
            <div className="mt-4">
              <label htmlFor="mikrochipSorszam" className="block text-white font-newsreader mb-2">
                Mikrochip sorszáma: *
              </label>
              <input
                id="mikrochipSorszam"
                className={`border ${errors.mikrochipSorszam ? "border-red-500" : "border-gray-300"} p-2 w-full text-white bg-grey`}
                type="text"
                name="mikrochipSorszam"
                placeholder="123 4567 89012345"
                value={formData.mikrochipSorszam}
                onChange={handleMicrochipNumberChange}
              />
              {errors.mikrochipSorszam && <p className="text-red-500 text-sm mt-1">{errors.mikrochipSorszam}</p>}
            </div>
          )}
        </div>

        {/* Ivartalanítás */}
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">
            <input 
              className="mr-2" 
              type="checkbox" 
              name="ivartalanitott" 
              checked={formData.ivartalanitott} 
              onChange={handleCheckboxChange} 
            />
            Eb ivartalanított
          </label>
          {formData.ivartalanitott && (
            <div className="mt-4">
              <label htmlFor="ivartalanitasIdopontja" className="block text-white font-newsreader mb-2">
                Ivartalanításának időpontja: (ÉÉÉÉ.HH.NN)
              </label>
              <input
                id="ivartalanitasIdopontja"
                className="border border-gray-300 p-2 w-full text-white bg-grey"
                type="text"
                name="ivartalanitasIdopontja"
                placeholder="ÉÉÉÉ.HH.NN"
                value={formData.ivartalanitasIdopontja}
                onChange={(e) => handleDateChange(e, "ivartalanitasIdopontja")}
              />
            </div>
          )}
        </div>

        {/* Gombok */}
        <div className="flex justify-between">
          <button type="button" onClick={handleClickBack} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 w-full sm:w-auto">
            Vissza
          </button>
          <button type="button" onClick={handleClickNext} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full sm:w-auto">
            Tovább
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Step2);