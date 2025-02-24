import React from "react";
import SendIcon from "@mui/icons-material/Send";
import Button from '@mui/material/Button';

const Step3 = ({ handleNext, handleBack }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Veszettség elleni oltás utolsó adatai</h2>
      <form>
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Utolsó védőoltás időpontja:</label>
          <input className="border border-gray-300 p-2 w-full text-white bg-grey" type="date" />
        </div>
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Orvosi bélyegző szám:</label>
          <input className="border border-gray-300 p-2 w-full text-white bg-grey" type="text" placeholder="XXX-XXX-XXX" />
        </div>
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Oltóanyag sorszáma:</label>
          <input className="border border-gray-300 p-2 w-full text-white bg-grey" type="text" placeholder="XXX-XXX-XXX" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Oltási kiskönyv adatok</h2>
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Oltási könyv szám:</label>
          <input className="border border-gray-300 p-2 w-full text-white bg-grey" type="text" placeholder="AA123456789" />
        </div>
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">Állatorvos bélyegző száma:</label>
          <input className="border border-gray-300 p-2 w-full text-white bg-grey" type="text" placeholder="XXX-XXX-XXX" />
        </div>
        <div className="flex justify-between mb-4">
          <button type="button" onClick={handleBack} className="bg-gray-500 text-white py-1 px-3 rounded">
            Vissza
          </button>
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleNext}>
            Küldés
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step3;
