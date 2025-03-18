import React, { useState, useEffect } from "react";

const Step1 = ({ handleNext }) => {
  const [formData, setFormData] = useState({
    tulajdonosNeve: "",
    tulajdonosCim: "",
    tulajdonosTel: "",
    tulajdonosEmail: "",
  });

  // Mentett adatok betöltése a localStorage-ból
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formDataStep1")); // formDataStep1 használata
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  // Általános változáskezelő függvény
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      localStorage.setItem("formDataStep1", JSON.stringify(updatedData)); // formDataStep1 mentése
      return updatedData;
    });
  };

  // Telefonszám formázása
  const handlePhoneNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // Csak számokat tartunk meg
    let formattedInput = "";

    if (input.length > 0) {
      formattedInput += input.substring(0, 2); // Az első két számjegy
    }
    if (input.length > 2) {
      formattedInput += "/" + input.substring(2, 5); // A következő három számjegy
    }
    if (input.length > 5) {
      formattedInput += "-" + input.substring(5, 9); // Az utolsó négy számjegy
    }

    setFormData((prev) => {
      const updatedData = { ...prev, tulajdonosTel: formattedInput };
      localStorage.setItem("formDataStep1", JSON.stringify(updatedData)); // Adatok mentése
      return updatedData;
    });
  };

  // Form érvényességének ellenőrzése
  const isFormValid = () => {
    const { tulajdonosNeve, tulajdonosCim, tulajdonosTel, tulajdonosEmail } = formData;
    return (
      tulajdonosNeve.trim() !== "" &&
      tulajdonosCim.trim() !== "" &&
      tulajdonosTel.trim() !== "" &&
      tulajdonosEmail.trim() !== ""
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Tulajdonos adatai</h2>
      <form>
        {/* Név mező */}
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Tulajdonos neve:</label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="text"
            name="tulajdonosNeve"
            placeholder="Név"
            value={formData.tulajdonosNeve}
            onChange={handleChange}
          />
        </div>

        {/* Cím mező */}
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Tulajdonos címe:</label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="text"
            name="tulajdonosCim"
            placeholder="Cím: irsz, város, utca, házszám"
            value={formData.tulajdonosCim}
            onChange={handleChange}
          />
        </div>

        {/* Telefonszám mező */}
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Tulajdonos telefonszáma:</label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="text"
            name="tulajdonosTel"
            placeholder="Ajánlott formátum: 20/123-456"
            value={formData.tulajdonosTel}
            onChange={handlePhoneNumberChange}
          />
        </div>

        {/* E-mail mező */}
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Tulajdonos e-mail címe:</label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="email"
            name="tulajdonosEmail"
            placeholder="johndoe@gmail.com"
            value={formData.tulajdonosEmail}
            onChange={handleChange}
          />
        </div>

        {/* Tovább gomb */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleNext}
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

export default Step1;