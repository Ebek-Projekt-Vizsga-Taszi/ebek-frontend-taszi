import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

const Step3 = ({ handleNext, handleBack }) => {
  const [formData, setFormData] = useState({
    lastVaccinationDate: "",
    doctorStampNumber: "",
    vaccineSerialNumber: "",
    vaccinationBookNumber: "",
    vetStampNumber: "",
  });

  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    const isComplete = Object.values(formData).every((value) => value.trim() !== "");
    setIsFormComplete(isComplete);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Veszettség elleni oltás utolsó adatai</h2>
      <form>
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Utolsó védőoltás időpontja:</label>
          <input
            name="lastVaccinationDate"
            value={formData.lastVaccinationDate}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="date"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Orvosi bélyegző szám:</label>
          <input
            name="doctorStampNumber"
            value={formData.doctorStampNumber}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="text"
            placeholder="XXX-XXX-XXX"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Oltóanyag sorszáma:</label>
          <input
            name="vaccineSerialNumber"
            value={formData.vaccineSerialNumber}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="text"
            placeholder="XXX-XXX-XXX"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-white">Oltási kiskönyv adatok</h2>
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Oltási könyv szám:</label>
          <input
            name="vaccinationBookNumber"
            value={formData.vaccinationBookNumber}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="text"
            placeholder="AA123456789"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Állatorvos bélyegző száma:</label>
          <input
            name="vetStampNumber"
            value={formData.vetStampNumber}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full text-white bg-grey"
            type="text"
            placeholder="XXX-XXX-XXX"
          />
        </div>
        <div className="flex justify-between mb-4">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 w-full sm:w-auto"
          >
            Vissza
          </button>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleNext}
            disabled={!isFormComplete}
            className="w-full sm:w-auto"
          >
            Küldés
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step3;