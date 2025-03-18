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

  // Mentett adatok betöltése a localStorage-ból
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formDataStep2"));
    if (savedData) {
      setFormData((prev) => ({
        ...prev,
        ...savedData,
      }));
    }
  }, []);

  // Általános változáskezelő függvény
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      localStorage.setItem("formDataStep2", JSON.stringify(updatedData)); // Adatok mentése
      return updatedData;
    });
  };

  // Dátum formázása (xxxx.xx.xx)
  const handleDateChange = (e, fieldName) => {
    const input = e.target.value.replace(/\D/g, ""); // Csak számokat tartunk meg
    let formattedInput = "";

    if (input.length > 0) {
      formattedInput += input.substring(0, 4); // Év (4 számjegy)
    }
    if (input.length > 4) {
      formattedInput += "." + input.substring(4, 6); // Hónap (2 számjegy)
    }
    if (input.length > 6) {
      formattedInput += "." + input.substring(6, 8); // Nap (2 számjegy)
    }

    setFormData((prev) => {
      const updatedData = { ...prev, [fieldName]: formattedInput };
      localStorage.setItem("formDataStep2", JSON.stringify(updatedData)); // Adatok mentése
      return updatedData;
    });
  };

  // Mikrochip sorszám (csak számok)
  const handleMicrochipNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // Csak számokat tartunk meg
    setFormData((prev) => {
      const updatedData = { ...prev, mikrochipSorszam: input };
      localStorage.setItem("formDataStep2", JSON.stringify(updatedData)); // Adatok mentése
      return updatedData;
    });
  };

  // Checkbox változáskezelő függvény
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: checked };
      localStorage.setItem("formDataStep2", JSON.stringify(updatedData)); // Adatok mentése
      return updatedData;
    });
  };

  // Form érvényességének ellenőrzése
  const isFormValid = () => {
    const { ebHivoneve, ebFajtaja, ebNeme, ebSzulIdeje, ebSzine } = formData;
    return (
      ebHivoneve?.trim() !== "" &&
      ebFajtaja?.trim() !== "" &&
      ebNeme?.trim() !== "" &&
      ebSzulIdeje?.trim() !== "" &&
      ebSzine?.trim() !== ""
    );
  };

  const handleClickNext = useCallback(() => {
    if (isFormValid()) {
      handleNext();
    }
  }, [handleNext, isFormValid]);

  const handleClickBack = useCallback(() => {
    handleBack();
  }, [handleBack]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Eb adatai</h2>
      <form>
        {/* Eb hívóneve */}
        <div className="mb-4">
          <label htmlFor="ebHivoneve" className="block text-white font-newsreader mb-2">
            Eb hívóneve:
          </label>
          <input
            id="ebHivoneve"
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="text"
            name="ebHivoneve"
            placeholder="Hívónév"
            value={formData.ebHivoneve}
            onChange={handleChange}
          />
        </div>

        {/* Eb törzskönyvi neve */}
        <div className="mb-4">
          <label htmlFor="ebTorzskonyviNeve" className="block text-white font-newsreader mb-2">
            Eb törzskönyvi neve: Kitöltése nem kötelező
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
            Eb fajtája:
          </label>
          <input
            id="ebFajtaja"
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="text"
            name="ebFajtaja"
            placeholder="Fajta"
            value={formData.ebFajtaja}
            onChange={handleChange}
          />
        </div>

        {/* Eb neme */}
        <div className="mb-4">
          <label htmlFor="ebNeme" className="block text-white font-newsreader mb-2">
            Eb neme: Szuka, Kan
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

        {/* Eb születési ideje (xxxx.xx.xx) */}
        <div className="mb-4">
          <label htmlFor="ebSzulIdeje" className="block text-white font-newsreader mb-2">
            Eb születési ideje: Dátum (xxxx.xx.xx)
          </label>
          <input
            id="ebSzulIdeje"
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="text"
            name="ebSzulIdeje"
            placeholder="ÉÉÉÉ.HH.NN"
            value={formData.ebSzulIdeje}
            onChange={(e) => handleDateChange(e, "ebSzulIdeje")}
          />
        </div>

        {/* Eb színe */}
        <div className="mb-4">
          <label htmlFor="ebSzine" className="block text-white font-newsreader mb-2">
            Eb színe:
          </label>
          <input
            id="ebSzine"
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="text"
            name="ebSzine"
            placeholder="Szín"
            value={formData.ebSzine}
            onChange={handleChange}
          />
        </div>

        {/* Mikrochip */}
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">
            Eb rendelkezik mikrochippel:
            <input
              className="ml-2"
              type="checkbox"
              name="mikrochip"
              checked={formData.mikrochip}
              onChange={handleCheckboxChange}
            />
          </label>
          {formData.mikrochip && (
            <div className="mt-4">
              <label htmlFor="mikrochipSorszam" className="block text-white font-newsreader mb-2">
                Mikrochip sorszáma:
              </label>
              <input
                id="mikrochipSorszam"
                className="border border-gray-300 p-2 w-full text-white bg-grey"
                type="text"
                name="mikrochipSorszam"
                placeholder="Csak számok"
                value={formData.mikrochipSorszam}
                onChange={handleMicrochipNumberChange}
              />
            </div>
          )}
        </div>

        {/* Ivartalanítás */}
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">
            Eb ivartalanított:
            <input
              className="ml-2"
              type="checkbox"
              name="ivartalanitott"
              checked={formData.ivartalanitott}
              onChange={handleCheckboxChange}
            />
          </label>
          {formData.ivartalanitott && (
            <div className="mt-4">
              <label htmlFor="ivartalanitasIdopontja" className="block text-white font-newsreader mb-2">
                Ivartalanításának időpontja: Dátum (xxxx.xx.xx)
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
          <button
            type="button"
            onClick={handleClickBack}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 w-full sm:w-auto"
          >
            Vissza
          </button>
          <button
            type="button"
            onClick={handleClickNext}
            disabled={!isFormValid()}
            className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full sm:w-auto ${
              !isFormValid() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Tovább
          </button>
        </div>
      </form>
    </div>
  );
};



export default React.memo(Step2);