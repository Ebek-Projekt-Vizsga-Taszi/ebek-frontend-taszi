import React from 'react';

const Step4 = ({ handleBack }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sikeres adatfelvétel</h2>
      <p className="text-lg text-black font-newsreader mb-4">Az űrlap kitöltése sikeresen megtörtént. Köszönjük!</p>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-500 text-white py-1 px-3 rounded"
        >
          Vissza
        </button>
      </div>
    </div>
  );
};

export default Step4;
