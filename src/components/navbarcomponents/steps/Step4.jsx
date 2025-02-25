import React, { useState, useEffect } from "react";

const Step4 = ({ handleBack }) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 3000); // 3 másodperc után jelenik meg az üzenet

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Tartalom */}
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-4 text-white">Sikeres adatfelvétel</h2>
        <p className="text-lg text-white font-newsreader mb-4">
          Az űrlap kitöltése sikeresen megtörtént. Köszönjük!
        </p>
        {showMessage && (
          <p className="text-lg text-white font-newsreader mb-4">
            További információkat küldünk e-mailben.
          </p>
        )}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 w-full sm:w-auto"
          >
            Vissza
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4;