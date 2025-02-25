import React, { useState, useCallback } from "react";

const Step2 = ({ handleNext, handleBack }) => {
  const [hasMicrochip, setHasMicrochip] = useState(false);
  const [isNeutered, setIsNeutered] = useState(false);

  const handleClickNext = useCallback(() => {
    handleNext();
  }, [handleNext]);

  const handleClickBack = useCallback(() => {
    handleBack();
  }, [handleBack]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Eb adatai</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="dogName" className="block text-white font-newsreader mb-2">
            Eb hívóneve:
          </label>
          <input id="dogName" className="border border-gray-300 p-2 w-full text-white bg-grey" type="text" placeholder="Hívónév" />
        </div>
        <div className="mb-4">
          <label htmlFor="dogPedigreeName" className="block text-white font-newsreader mb-2">
            Eb törzskönyvi neve: Kitöltése nem kötelező
          </label>
          <input id="dogPedigreeName" className="border border-gray-300 p-2 w-full text-white bg-grey" type="text" placeholder="Törzskönyvi név" />
        </div>
        <div className="mb-4">
          <label htmlFor="dogBreed" className="block text-white font-newsreader mb-2">
            Eb fajtája:
          </label>
          <input id="dogBreed" className="border border-gray-300 p-2 w-full text-white bg-grey" type="text" placeholder="Fajta" />
        </div>
        <div className="mb-4">
          <label htmlFor="dogGender" className="block text-white font-newsreader mb-2">
            Eb neme: Szuka, Kan
          </label>
          <select id="dogGender" className="border border-gray-300 p-2 w-full text-white bg-grey">
            <option value="Szuka">Szuka</option>
            <option value="Kan">Kan</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="dogBirthDate" className="block text-white font-newsreader mb-2">
            Eb születési ideje: Dátum (év/hónap/nap)
          </label>
          <input id="dogBirthDate" className="border border-gray-300 p-2 w-full text-white bg-grey" type="date" />
        </div>
        <div className="mb-4">
          <label htmlFor="dogColor" className="block text-white font-newsreader mb-2">
            Eb színe:
          </label>
          <input id="dogColor" className="border border-gray-300 p-2 w-full text-white bg-grey" type="text" placeholder="Szín" />
        </div>
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">
            Eb rendelkezik mikrochippel:
            <input className="ml-2" type="checkbox" checked={hasMicrochip} onChange={(e) => setHasMicrochip(e.target.checked)} />
          </label>
          {hasMicrochip && (
            <div className="mt-4">
              <label htmlFor="microchipNumber" className="block text-white font-newsreader mb-2">
                Mikrochip sorszáma:
              </label>
              <input
                id="microchipNumber"
                className="border border-gray-300 p-2 w-full text-white bg-grey"
                type="text"
                placeholder="Mikrochip sorszáma"
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-white font-newsreader mb-2">
            Eb ivartalanított:
            <input className="ml-2" type="checkbox" checked={isNeutered} onChange={(e) => setIsNeutered(e.target.checked)} />
          </label>
          {isNeutered && (
            <div className="mt-4">
              <label htmlFor="neuteringDate" className="block text-white font-newsreader mb-2">
                Ivartalanításának időpontja: Dátum (év/hónap/nap)
              </label>
              <input id="neuteringDate" className="border border-gray-300 p-2 w-full text-white bg-grey" type="date" />
            </div>
          )}
        </div>
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
