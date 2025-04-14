import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Urlapok = () => {
  const [formList, setFormList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Nincs érvényes token. Kérjük, jelentkezzen be újra.");
        }

        const response = await fetch("http://localhost:8000/felhasznalok/bekuldott-urlapok", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFormList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Hiba az űrlapok betöltésekor:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  const openModal = (form) => {
    setSelectedForm(form);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedForm(null);
  };

  const downloadForm = (formData) => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kutya_nyilvantartas_${formData.ebHivoneve || "ismeretlen"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-gray-900 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Eddigi beküldött adatlapok:</h2>
          <p>Betöltés...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-gray-900 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Hiba történt</h2>
          <p className="text-red-400">{error}</p>
          <p className="mt-2">Nem sikerült betölteni az űrlapokat.</p>
        </div>
      </div>
    );
  }

  if (formList.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-gray-900 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Eddigi beküldött adatlapok:</h2>
          <p>Még nincsenek beküldött űrlapok</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-900 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Eddigi beküldött adatlapok:</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Kutya neve
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Fajta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Beküldés dátuma
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Állapot
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Műveletek
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {formList.map((form, index) => (
                <tr key={index} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-white">{form.ebHivoneve || "Névtelen kutya"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{form.ebFajtaja || "Ismeretlen fajta"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {form.bekuldesDatuma ? new Date(form.bekuldesDatuma).toLocaleDateString() : "Ismeretlen dátum"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        form.status === "elfogadva"
                          ? "bg-green-500 text-green-100"
                          : "bg-yellow-500 text-yellow-100"
                      }`}
                    >
                      {form.status === "elfogadva" ? "Elfogadva" : "Feldolgozás alatt"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => openModal(form)} className="text-blue-400 hover:text-blue-300 mr-3">
                      Részletek
                    </button>
                    <button onClick={() => downloadForm(form)} className="text-green-400 hover:text-green-300">
                      Letöltés
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Űrlap részletei"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40"
      >
        {selectedForm && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {selectedForm.ebHivoneve || "Névtelen kutya"} - {selectedForm.ebFajtaja || "Ismeretlen fajta"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="mb-4">
              <p className="text-gray-400">Beküldés dátuma:</p>
              <p>{selectedForm.bekuldesDatuma ? new Date(selectedForm.bekuldesDatuma).toLocaleDateString() : "Ismeretlen dátum"}</p>
            </div>

            <div className="mb-4">
              <p className="text-gray-400">Állapot:</p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedForm.status === "elfogadva" ? "bg-green-500 text-green-100" : "bg-yellow-500 text-yellow-100"
                }`}
              >
                {selectedForm.status === "elfogadva" ? "Elfogadva" : "Feldolgozás alatt"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tulajdonos adatai */}
              <div>
                <h3 className="font-semibold text-lg mb-3 border-b pb-2">Tulajdonos adatai</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Név:</span> {selectedForm.tulajdonosNeve || "Nincs megadva"}</p>
                  <p><span className="font-medium">Cím:</span> {selectedForm.tulajdonosCim || "Nincs megadva"}</p>
                  <p><span className="font-medium">Telefon:</span> {selectedForm.tulajdonosTel || "Nincs megadva"}</p>
                  <p><span className="font-medium">Email:</span> {selectedForm.tulajdonosEmail || "Nincs megadva"}</p>
                </div>
              </div>

              {/* Kutya adatai */}
              <div>
                <h3 className="font-semibold text-lg mb-3 border-b pb-2">Kutya adatai</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Hiv. név:</span> {selectedForm.ebHivoneve || "Nincs megadva"}</p>
                  <p><span className="font-medium">Törzskönyvi név:</span> {selectedForm.ebTorzkonyviNeve || "Nincs megadva"}</p>
                  <p><span className="font-medium">Fajta:</span> {selectedForm.ebFajtaja || "Nincs megadva"}</p>
                  <p><span className="font-medium">Nem:</span> {selectedForm.ebNeme || "Nincs megadva"}</p>
                  <p><span className="font-medium">Születési idő:</span> {selectedForm.ebSzulIdeje ? new Date(selectedForm.ebSzulIdeje).toLocaleDateString() : "Nincs megadva"}</p>
                  <p><span className="font-medium">Szín:</span> {selectedForm.ebSzine || "Nincs megadva"}</p>
                  <p><span className="font-medium">Chip sorszám:</span> {selectedForm.chipSorszam || "Nincs megadva"}</p>
                </div>
              </div>

              {/* Orvosi adatok */}
              <div>
                <h3 className="font-semibold text-lg mb-3 border-b pb-2">Orvosi adatok</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Ivartalanítás időpontja:</span> {selectedForm.ivartalanitasIdo ? new Date(selectedForm.ivartalanitasIdo).toLocaleDateString() : "Nincs megadva"}</p>
                  <p><span className="font-medium">Oltási időpont:</span> {selectedForm.oltasiIdo ? new Date(selectedForm.oltasiIdo).toLocaleDateString() : "Nincs megadva"}</p>
                  <p><span className="font-medium">Orvosi bélyegző szám:</span> {selectedForm.orvosiBelyegzoSzam || "Nincs megadva"}</p>
                  <p><span className="font-medium">Oltási könyv szám:</span> {selectedForm.oltasiKonyvSzam || "Nincs megadva"}</p>
                  <p><span className="font-medium">Oltási bélyegző szám:</span> {selectedForm.oltasiBelyegzoSzam || "Nincs megadva"}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => downloadForm(selectedForm)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Letöltés
              </button>
              <button onClick={closeModal} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                Bezárás
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Urlapok;
