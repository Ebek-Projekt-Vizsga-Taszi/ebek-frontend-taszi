import React, { useState, useEffect } from "react";

const Step1 = ({ handleNext }) => {
  const [formData, setFormData] = useState({
    tulajdonosNeve: "",
    tulajdonosCim: "",
    tulajdonosTel: "",
    tulajdonosEmail: "",
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState("");

  // Felhasználó adatainak betöltése a komponens mountolásakor
  useEffect(() => {
    fetchUserData();
  }, []); // Üres függőségi tömb = csak egyszer fut le a mountoláskor

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (token) {
        const response = await fetch('http://localhost:8000/felhasznalok/tulajdonos-adatok', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setFormData({
            tulajdonosNeve: data.tulajdonosNeve || "",
            tulajdonosCim: data.tulajdonosCim || "",
            tulajdonosTel: data.tulajdonosTel || "",
            tulajdonosEmail: data.tulajdonosEmail || "",
          });
          setDataSource("Fiókadatok");
        } else {
          const errorData = await response.json();
          console.error("Szerver hiba:", errorData.message);
          loadFromLocalStorage();
        }
      } else {
        loadFromLocalStorage();
      }
    } catch (error) {
      console.error("Hálózati hiba:", error);
      loadFromLocalStorage();
    } finally {
      setIsLoading(false);
    }
  };

  // Segédfüggvény a localStorage-ból való betöltéshez
  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem("formDataStep1");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        setDataSource("Korábban megadott adatok");
      } catch (e) {
        console.error("Hibás formátumú mentett adat:", e);
        setDataSource("Új adatok");
      }
    } else {
      setDataSource("Új adatok");
    }
  };
  // Általános változáskezelő függvény
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      localStorage.setItem("formDataStep1", JSON.stringify(updatedData));
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
      localStorage.setItem("formDataStep1", JSON.stringify(updatedData));
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

  if (isLoading) {
    return <div className="text-white">Adatok betöltése...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Tulajdonos adatai</h2>
      
      {dataSource === "Fiókadatok" && (
        <div className="mb-4 p-3 bg-blue-900 text-white rounded">
          A fiókodhoz tartozó adatokat automatikusan betöltöttük. Szükség esetén módosíthatod őket.
        </div>
      )}
      
      {dataSource === "Korábban megadott adatok" && (
        <div className="mb-4 p-3 bg-gray-700 text-white rounded">
          A korábban megadott adataidat betöltöttük. Módosíthatod őket, ha szükséges.
        </div>
      )}
      
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