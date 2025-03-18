import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

const Step3 = ({ handleBack }) => {
  const [localFormData, setLocalFormData] = useState({
    utolsoOltasIdo: "",
    orvosiBelyegzoSzam: "",
    oltanyagSorszam: "",
    oltasiKonyvSzam: "",
    allatorvosBelyegzoSzam: "",
  });

  // Mentett adatok betöltése a localStorage-ból
  useEffect(() => {
    const savedDataStep1 = JSON.parse(localStorage.getItem("formDataStep1"));
    const savedDataStep2 = JSON.parse(localStorage.getItem("formDataStep2"));
    const savedDataStep3 = JSON.parse(localStorage.getItem("formDataStep3"));

    if (savedDataStep1) {
      setLocalFormData((prev) => ({ ...prev, ...savedDataStep1 }));
    }
    if (savedDataStep2) {
      setLocalFormData((prev) => ({ ...prev, ...savedDataStep2 }));
    }
    if (savedDataStep3) {
      setLocalFormData((prev) => ({ ...prev, ...savedDataStep3 }));
    }
  }, []);

  // Általános változáskezelő függvény
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      localStorage.setItem("formDataStep3", JSON.stringify(updatedData)); // Adatok mentése
      return updatedData;
    });
  };

  // Dátum formázása (xxxx.xx.xx)
  const handleDateChange = (e) => {
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

    setLocalFormData((prev) => {
      const updatedData = { ...prev, utolsoOltasIdo: formattedInput };
      localStorage.setItem("formDataStep3", JSON.stringify(updatedData)); // Adatok mentése
      return updatedData;
    });
  };

  // Oltási könyv szám formázása (XX-123456789)
  const handleOltasiKonyvSzamChange = (e) => {
    const input = e.target.value.toUpperCase(); // Nagybetűvé alakítjuk
    let formattedInput = "";

    // Az első két karakter betű lehet
    if (input.length > 0) {
      formattedInput += input.substring(0, 2).replace(/[^A-Za-z]/g, ""); // Csak betűk
    }
    // Kötőjel és 9 számjegy
    if (input.length > 2) {
      formattedInput += "-" + input.substring(2, 11).replace(/\D/g, ""); // Csak számok
    }

    setLocalFormData((prev) => {
      const updatedData = { ...prev, oltasiKonyvSzam: formattedInput };
      localStorage.setItem("formDataStep3", JSON.stringify(updatedData)); // Adatok mentése
      return updatedData;
    });
  };

  // Bélyegző szám formázása (XXX-XXX-XXX)
  const handleBelyegzoSzamChange = (e, fieldName) => {
    const input = e.target.value.replace(/\D/g, ""); // Csak számokat tartunk meg
    let formattedInput = "";

    if (input.length > 0) {
      formattedInput += input.substring(0, 3); // Első 3 számjegy
    }
    if (input.length > 3) {
      formattedInput += "-" + input.substring(3, 6); // Következő 3 számjegy
    }
    if (input.length > 6) {
      formattedInput += "-" + input.substring(6, 9); // Utolsó 3 számjegy
    }

    setLocalFormData((prev) => {
      const updatedData = { ...prev, [fieldName]: formattedInput };
      localStorage.setItem("formDataStep3", JSON.stringify(updatedData)); // Adatok mentése
      return updatedData;
    });
  };

  // Form érvényességének ellenőrzése
  const isFormValid = () => {
    const { utolsoOltasIdo, orvosiBelyegzoSzam, oltanyagSorszam, oltasiKonyvSzam, allatorvosBelyegzoSzam } = localFormData;
    return (
      utolsoOltasIdo?.trim() !== "" &&
      orvosiBelyegzoSzam?.trim() !== "" &&
      oltanyagSorszam?.trim() !== "" &&
      oltasiKonyvSzam?.trim() !== "" &&
      allatorvosBelyegzoSzam?.trim() !== ""
    );
  };

  // Küldés gomb eseménykezelője
  const handleClickSubmit = async () => {
    if (isFormValid()) {
      // Összes adat összegyűjtése a localStorage-ból
      const savedDataStep1 = JSON.parse(localStorage.getItem("formDataStep1"));
      const savedDataStep2 = JSON.parse(localStorage.getItem("formDataStep2"));
      const savedDataStep3 = JSON.parse(localStorage.getItem("formDataStep3"));

      // Dátumok átalakítása backend által várt formátumra
      const formatDateForBackend = (date) => {
        return date.replace(/\./g, "-"); // "2023.10.05" -> "2023-10-05"
      };

      // Összes adat összeállítása
      const backendData = {
        tulajdonosTel: savedDataStep1.tulajdonosTel,
        tulajdonosEmail: savedDataStep1.tulajdonosEmail,
        tulajdonosNeve: savedDataStep1.tulajdonosNeve,
        tulajdonosCim: savedDataStep1.tulajdonosCim,
        ebHivoneve: savedDataStep2.ebHivoneve,
        ebTorzkonyviNeve: savedDataStep2.ebTorzskonyviNeve,
        ebFajtaja: savedDataStep2.ebFajtaja,
        ebNeme: savedDataStep2.ebNeme,
        ebSzulIdeje: formatDateForBackend(savedDataStep2.ebSzulIdeje),
        ebSzine: savedDataStep2.ebSzine,
        chipSorszam: savedDataStep2.mikrochipSorszam,
        ivartalanitasIdo: formatDateForBackend(savedDataStep2.ivartalanitasIdopontja),
        oltasiIdo: formatDateForBackend(savedDataStep3.utolsoOltasIdo),
        orvosiBelyegzoSzam: savedDataStep3.orvosiBelyegzoSzam,
        oltasiKonyvSzam: savedDataStep3.oltasiKonyvSzam,
        oltasiBelyegzoSzam: savedDataStep3.allatorvosBelyegzoSzam,
      };

      try {
        // Küldés a backendnek
        const response = await fetch("http://localhost:8000/felhasznalok/Ujurlap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(backendData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Backend válasza:", responseData);
          alert("Adatok sikeresen elküldve!");
        } else {
          const errorData = await response.json();
          alert(`Hiba történt: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Hiba történt az adatok küldése során:", error);
        alert("Hiba történt az adatok küldése során.");
      }
    } else {
      console.error("Az űrlap nem érvényes!");
    }
  };

  // LocalStorage törlése
  const handleClearLocalStorage = () => {
    localStorage.removeItem("formDataStep1"); // Step1 adatainak törlése
    localStorage.removeItem("formDataStep2"); // Step2 adatainak törlése
    localStorage.removeItem("formDataStep3"); // Step3 adatainak törlése
    setLocalFormData({
      utolsoOltasIdo: "",
      orvosiBelyegzoSzam: "",
      oltanyagSorszam: "",
      oltasiKonyvSzam: "",
      allatorvosBelyegzoSzam: "",
    });
    alert("LocalStorage adatok törölve!");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Veszettség elleni oltás utolsó adatai</h2>
      <form>
        {/* Utolsó oltás időpontja */}
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Utolsó oltás időpontja:</label>
          <input
            name="utolsoOltasIdo"
            value={localFormData.utolsoOltasIdo}
            onChange={handleDateChange}
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="text"
            placeholder="ÉÉÉÉ.HH.NN"
          />
        </div>

        {/* Orvosi bélyegző szám */}
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Orvosi bélyegző szám:</label>
          <input
            name="orvosiBelyegzoSzam"
            value={localFormData.orvosiBelyegzoSzam}
            onChange={(e) => handleBelyegzoSzamChange(e, "orvosiBelyegzoSzam")}
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="text"
            placeholder="XXX-XXX-XXX"
          />
        </div>

        {/* Oltóanyag sorszáma */}
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Oltóanyag sorszáma:</label>
          <input
            name="oltanyagSorszam"
            value={localFormData.oltanyagSorszam}
            onChange={(e) => handleBelyegzoSzamChange(e, "oltanyagSorszam")}
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="text"
            placeholder="XXX-XXX-XXX"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">Oltási kiskönyv adatok</h2>

        {/* Oltási könyv szám */}
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Oltási könyv szám:</label>
          <input
            name="oltasiKonyvSzam"
            value={localFormData.oltasiKonyvSzam}
            onChange={handleOltasiKonyvSzamChange}
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="text"
            placeholder="XX-123456789"
          />
        </div>

        {/* Állatorvos bélyegző száma */}
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Állatorvos bélyegző száma:</label>
          <input
            name="allatorvosBelyegzoSzam"
            value={localFormData.allatorvosBelyegzoSzam}
            onChange={(e) => handleBelyegzoSzamChange(e, "allatorvosBelyegzoSzam")}
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="text"
            placeholder="XXX-XXX-XXX"
          />
        </div>

        {/* Gombok */}
        <div className="flex justify-between mb-4">
          <button type="button" onClick={handleBack} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 w-full sm:w-auto">
            Vissza
          </button>
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleClickSubmit} disabled={!isFormValid()} className="w-full sm:w-auto">
            Küldés
          </Button>
          <Button onClick={handleClearLocalStorage} className="w-full sm:w-auto">
            Localstorage Törlése
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step3;