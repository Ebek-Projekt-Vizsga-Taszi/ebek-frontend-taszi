import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; // Új import

const Step3 = ({ handleBack }) => {
  const navigate = useNavigate();
  const [localFormData, setLocalFormData] = useState({
    utolsoOltasIdo: "",
    orvosiBelyegzoSzam: "",
    oltanyagSorszam: "",
    oltasiKonyvSzam: "",
    allatorvosBelyegzoSzam: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadSuccess, setLoadSuccess] = useState(false);

  // Mentett adatok betöltése
  useEffect(() => {
    const savedDataStep3 = JSON.parse(localStorage.getItem("formDataStep3"));
    if (savedDataStep3) {
      setLocalFormData(savedDataStep3);
    }
  }, []);

  // Mentett oltási adatok betöltése a szerverről
  const loadSavedData = async () => {
    setIsLoading(true);
    setLoadSuccess(false);
    setSubmitError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Nincs token, kihagyjuk a szerverről történő betöltést");
        return;
      }

      const response = await fetch("http://localhost:8000/felhasznalok/step2-adatok", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Hiba: ${response.status}`);
      }

      const data = await response.json();

      // Frissítjük az állapotot a szerverről kapott adatokkal
      const updatedData = {
        utolsoOltasIdo: "",
        orvosiBelyegzoSzam: data.utolsoOltas?.orvosiBelyegzoSzam || "",
        oltanyagSorszam: data.utolsoOltas?.oltanyagSorszam || "",
        oltasiKonyvSzam: data.oltasiKonyvSzam || "",
        allatorvosBelyegzoSzam: data.utolsoUrlap?.oltasiBelyegzoSzam|| "",
      };

      setLocalFormData(updatedData);
      localStorage.setItem("formDataStep3", JSON.stringify(updatedData));
      setLoadSuccess(true);
    } catch (error) {
      console.error("Hiba az adatok betöltésekor:", error);
      setSubmitError("Nem sikerült betölteni a mentett adatokat");
    } finally {
      setIsLoading(false);
    }
  };

  // Általános változáskezelő függvény
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      localStorage.setItem("formDataStep3", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  // Dátum formázása (xxxx.xx.xx)
  const handleDateChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    let formattedInput = "";

    if (input.length > 0) {
      formattedInput += input.substring(0, 4);
    }

    if (input.length > 4) {
      const month = input.substring(4, 6);
      const correctedMonth = month === "00" ? "01" : parseInt(month) > 12 ? "12" : month.padStart(2, "0");
      formattedInput += "." + correctedMonth;
    }

    if (input.length > 6) {
      const day = input.substring(6, 8);
      const correctedDay = day === "00" ? "01" : parseInt(day) > 31 ? "31" : day.padStart(2, "0");
      formattedInput += "." + correctedDay;
    }

    setLocalFormData((prev) => {
      const updatedData = { ...prev, utolsoOltasIdo: formattedInput };
      localStorage.setItem("formDataStep3", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  // Oltási könyv szám formázása (XX-123456789)
  const handleOltasiKonyvSzamChange = (e) => {
    const input = e.target.value.toUpperCase();
    let formattedInput = "";

    if (input.length > 0) formattedInput += input.substring(0, 2).replace(/[^A-Za-z]/g, "");
    if (input.length > 2) formattedInput += "-" + input.substring(2, 11).replace(/\D/g, "");

    setLocalFormData((prev) => {
      const updatedData = { ...prev, oltasiKonyvSzam: formattedInput };
      localStorage.setItem("formDataStep3", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  // Bélyegző szám formázása (XXX-XXX-XXX)
  const handleBelyegzoSzamChange = (e, fieldName) => {
    const input = e.target.value.replace(/\D/g, "");
    let formattedInput = "";

    if (input.length > 0) formattedInput += input.substring(0, 3);
    if (input.length > 3) formattedInput += "-" + input.substring(3, 6);
    if (input.length > 6) formattedInput += "-" + input.substring(6, 9);

    setLocalFormData((prev) => {
      const updatedData = { ...prev, [fieldName]: formattedInput };
      localStorage.setItem("formDataStep3", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  // Form érvényességének ellenőrzése
  const isFormValid = () => {
    const { utolsoOltasIdo, orvosiBelyegzoSzam, oltasiKonyvSzam, allatorvosBelyegzoSzam } = localFormData;
    return (
      utolsoOltasIdo?.trim() !== "" && orvosiBelyegzoSzam?.trim() !== "" && oltasiKonyvSzam?.trim() !== "" && allatorvosBelyegzoSzam?.trim() !== ""
    );
  };

  const handleClickSubmit = async () => {
    if (!isFormValid()) {
      setSubmitError("Kérjük töltsd ki az összes kötelező mezőt!");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const savedDataStep2 = JSON.parse(localStorage.getItem("formDataStep2"));

      const requestData = {
        ebHivoneve: savedDataStep2.ebHivoneve,
        ebTorzkonyviNeve: savedDataStep2.ebTorzskonyviNeve || null,
        ebFajtaja: savedDataStep2.ebFajtaja,
        ebNeme: savedDataStep2.ebNeme,
        ebSzulIdeje: savedDataStep2.ebSzulIdeje,
        ebSzine: savedDataStep2.ebSzine,
        chipSorszam: savedDataStep2.mikrochip ? savedDataStep2.mikrochipSorszam : null,
        ivartalanitasIdo: savedDataStep2.ivartalanitasIdopontja || null,
        oltasiIdo: localFormData.utolsoOltasIdo,
        orvosiBelyegzoSzam: localFormData.orvosiBelyegzoSzam,
        oltasiKonyvSzam: localFormData.oltasiKonyvSzam,
        oltasiBelyegzoSzam: localFormData.allatorvosBelyegzoSzam, // Ez lesz az allatorvosBelyegzoszam
        oltanyagSorszam: localFormData.oltanyagSorszam || null,
      };

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Nincs érvényes hitelesítési token!");

      const response = await fetch("http://localhost:8000/felhasznalok/Ujurlap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Szerver hiba");
      }

      const responseData = await response.json();
      console.log("Sikeres válasz:", responseData);

      setSubmitSuccess(true);

      // Adatok törlése localStorage-ból
      localStorage.removeItem("formDataStep1");
      localStorage.removeItem("formDataStep2");
      localStorage.removeItem("formDataStep3");

      // Átirányítás 2 másodperc múlva
      setTimeout(() => navigate("/Dashboard"), 2000);
    } catch (error) {
      console.error("Hiba történt a küldés során:", error);
      setSubmitError(error.message || "Hiba történt az adatok küldése során");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Veszettség elleni oltás utolsó adatai</h2>

      {submitError && <div className="mb-4 p-3 bg-red-500 text-white rounded">{submitError}</div>}

      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-500 text-white rounded">Sikeresen beküldted az űrlapot! Átirányítás a következő oldalra...</div>
      )}
      <form>
        <div className="mb-4">
          <button
            type="button"
            onClick={loadSavedData}
            disabled={isLoading}
            className={`${isLoading ? "bg-gray-500" : "bg-green-500"} text-white py-2 px-4 rounded hover:bg-green-600 w-full sm:w-auto mb-2`}
          >
            {isLoading ? "Betöltés..." : "Mentett oltási adatok betöltése"}
          </button>

          {loadSuccess && <div className="p-2 bg-green-100 text-green-800 rounded">Sikeresen betöltöttük a mentett oltási adatokat!</div>}
        </div>
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
            required
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
            required
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
            required
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
            required
          />
        </div>

        {/* Gombok */}
        <div className="flex justify-between mb-4 gap-2">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 flex-1"
            disabled={isSubmitting}
          >
            Vissza
          </button>

          <Button variant="contained" endIcon={<SendIcon />} onClick={handleClickSubmit} disabled={!isFormValid() || isSubmitting} className="flex-1">
            {isSubmitting ? "Küldés..." : "Küldés"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step3;
