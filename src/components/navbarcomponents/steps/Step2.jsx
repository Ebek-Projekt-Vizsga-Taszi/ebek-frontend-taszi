import React, { useState } from 'react';

const Step2 = ({ handleNext, handleBack }) => {
  const [hasMicrochip, setHasMicrochip] = useState(false);
  const [isNeutered, setIsNeutered] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Eb adatai</h2>
      <form>
        <div className="mb-4">
          <label className="block text-black font-newsreader mb-2">
            Eb hívóneve:
          </label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-black"
            type="text"
            placeholder="Hívónév"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-newsreader mb-2">
            Eb törzskönyvi neve: Kitöltése nem kötelező
          </label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-black"
            type="text"
            placeholder="Törzskönyvi név"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-newsreader mb-2">
            Eb fajtája:
          </label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-black"
            type="text"
            placeholder="Fajta"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-newsreader mb-2">
            Eb neme: Szuka, Kan
          </label>
          <select className="border border-gray-300 p-2 w-full text-white bg-black">
            <option value="Szuka">Szuka</option>
            <option value="Kan">Kan</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-black font-newsreader mb-2">
            Eb születési ideje: Dátum (év/hónap/nap)
          </label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-black"
            type="date"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-newsreader mb-2">
            Eb színe:
          </label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-black"
            type="text"
            placeholder="Szín"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-newsreader mb-2">
            Eb rendelkezik mikrochippel:
            <input
              className="ml-2"
              type="checkbox"
              checked={hasMicrochip}
              onChange={(e) => setHasMicrochip(e.target.checked)}
            />
          </label>
          {hasMicrochip && (
            <div className="mt-4">
              <label className="block text-black font-newsreader mb-2">
                Mikrochip sorszáma:
              </label>
              <input
                className="border border-gray-300 p-2 w-full text-white bg-black"
                type="text"
                placeholder="Mikrochip sorszáma"
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-black font-newsreader mb-2">
            Eb ivartalanított:
            <input
              className="ml-2"
              type="checkbox"
              checked={isNeutered}
              onChange={(e) => setIsNeutered(e.target.checked)}
            />
          </label>
          {isNeutered && (
            <div className="mt-4">
              <label className="block text-black font-newsreader mb-2">
                Ivartalanításának időpontja: Dátum (év/hónap/nap)
              </label>
              <input
                className="border border-gray-300 p-2 w-full text-white bg-black"
                type="date"
              />
            </div>
          )}
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

export default Step2;
