import React, { useState, useEffect } from 'react';

const Ertesitesek = () => {
  const [ertesitesek, setErtesitesek] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchErtesitesek = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/ertesitesek', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Nem sikerült betölteni az értesítéseket');
        }

        const data = await response.json();
        setErtesitesek(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchErtesitesek();
  }, []);

  const handleOlvasott = async (ertesitesId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/ertesitesek/${ertesitesId}/olvasott`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Nem sikerült frissíteni az értesítés állapotát');
      }

      setErtesitesek(prev => 
        prev.map(ertesites => 
          ertesites.id === ertesitesId 
            ? { ...ertesites, olvasott: true }
            : ertesites
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Értesítések</h1>

      {ertesitesek.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Nincsenek új értesítések</p>
        </div>
      ) : (
        <div className="space-y-4">
          {ertesitesek.map((ertesites) => (
            <div
              key={ertesites.id}
              className={`p-4 rounded-lg shadow-md ${
                ertesites.olvasott ? 'bg-gray-50' : 'bg-blue-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{ertesites.cim}</h3>
                  <p className="text-gray-600 mt-2">{ertesites.tartalom}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(ertesites.datum).toLocaleString()}
                  </p>
                </div>
                {!ertesites.olvasott && (
                  <button
                    onClick={() => handleOlvasott(ertesites.id)}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Olvasottnak jelöl
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ertesitesek; 