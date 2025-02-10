import React from 'react';

const Step1 = ({ handleNext }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tulajdonos adatai</h2>
      <form>
        <div className="mb-4">
          <label className="block text-black font-newsreader mb-2">
            Tulajdonos neve:
          </label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-black"
            type="text"
            placeholder="Név"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-newsreader mb-2">
            Tulajdonos címe:
          </label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-black"
            type="text"
            placeholder="Cím: irsz, város, utca, házszám"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-newsreader mb-2">
            Tulajdonos telefonszáma:
          </label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-black"
            type="text"
            placeholder="Ajánlott formátum: 20/123-456"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black font-newsreader mb-2">
            Tulajdonos e-mail címe:
          </label>
          <input
            className="border border-gray-300 p-2 w-full text-white bg-black"
            type="email"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="flex justify-end">
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

export default Step1;
