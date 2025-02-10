import React from 'react';

const Step3 = ({ handleNext, handleBack }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Veszettség elleni oltás utolsó adatai</h2>
      <form>
        <div className="mb-4">
          <label className="block text-black font-newsreader mb-2">
            Utolsó védőoltás időpontja:
          </label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-black"
            type="date"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-newsreader mb-2">
            Orvosi bélyegző szám:
          </label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-black"
            type="text"
            placeholder="XXX-XXX-XXX"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-newsreader mb-2">
            Oltóanyag sorszáma:
          </label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-black"
            type="text"
            placeholder="XXX-XXX-XXX"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">Oltási kiskönyv adatok</h2>
        <div className="mb-4">
          <label className="block text-black font-newsreader mb-2">
            Oltási könyv szám:
          </label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-black"
            type="text"
            placeholder="AA123456789"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-newsreader mb-2">
            Állatorvos bélyegző száma:
          </label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-black"
            type="text"
            placeholder="XXX-XXX-XXX"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-500 text-white py-1 px-3 rounded"
          >
            Vissza
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="bg-blue-500 text-white py-1 px-3 rounded"
          >
            Tovább
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3;
