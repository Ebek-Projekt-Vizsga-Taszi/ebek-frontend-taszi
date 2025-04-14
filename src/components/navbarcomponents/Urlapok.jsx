import React from 'react';

const Urlapok = ({ formList }) => {
  // Ha a formList nem létezik vagy üres, jelenítsünk meg egy üzenetet
  if (!formList || formList.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-gray-900 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Nincsenek beküldött űrlapok</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">Beküldött Űrlapok</h2>
        
        <div className="divide-y">
          {formList.map((form, index) => (
            <div key={index} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">{form.ebHivoneve} - {form.ebFajtaja}</h3>
                <button 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => downloadForm(form)}
                >
                  Letöltés
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Tulajdonos adatai:</h4>
                  <p><span className="font-medium">Név:</span> {form.tulajdonosNeve}</p>
                  <p><span className="font-medium">Cím:</span> {form.tulajdonosCim}</p>
                  <p><span className="font-medium">Telefon:</span> {form.tulajdonosTel}</p>
                  <p><span className="font-medium">Email:</span> {form.tulajdonosEmail}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Kutya adatai:</h4>
                  <p><span className="font-medium">Hiv. név:</span> {form.ebHivoneve}</p>
                  <p><span className="font-medium">Törzskönyvi név:</span> {form.ebTorzkonyviNeve || '-'}</p>
                  <p><span className="font-medium">Fajta:</span> {form.ebFajtaja}</p>
                  <p><span className="font-medium">Nem:</span> {form.ebNeme}</p>
                  <p><span className="font-medium">Születési idő:</span> {new Date(form.ebSzulIdeje).toLocaleDateString()}</p>
                  <p><span className="font-medium">Szín:</span> {form.ebSzine}</p>
                  <p><span className="font-medium">Chip sorszám:</span> {form.chipSorszam || '-'}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Orvosi adatok:</h4>
                  <p><span className="font-medium">Ivartalanítás időpontja:</span> {form.ivartalanitasIdo ? new Date(form.ivartalanitasIdo).toLocaleDateString() : '-'}</p>
                  <p><span className="font-medium">Oltási időpont:</span> {new Date(form.oltasiIdo).toLocaleDateString()}</p>
                  <p><span className="font-medium">Orvosi bélyegző szám:</span> {form.orvosiBelyegzoSzam}</p>
                  <p><span className="font-medium">Oltási könyv szám:</span> {form.oltasiKonyvSzam}</p>
                  <p><span className="font-medium">Oltási bélyegző szám:</span> {form.oltasiBelyegzoSzam}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Segédfüggvény az űrlap letöltéséhez
const downloadForm = (formData) => {
  // Itt implementálhatod a letöltési logikát
  // Példa: PDF generálás vagy JSON letöltés
  const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `kutya_nyilvantartas_${formData.ebHivoneve}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export default Urlapok;