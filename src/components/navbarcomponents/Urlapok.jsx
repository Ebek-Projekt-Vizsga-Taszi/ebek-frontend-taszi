import React from 'react';

const Urlapok = ({ formList }) => {
  // Ha a formList nem létezik vagy üres, jelenítsünk meg egy üzenetet
  if (!formList || formList.length === 0) {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <h2 className="text-3xl font-bold mb-4 font-newsreader text-white">Nincsenek beküldött űrlapok</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-4" style={{ color: 'black', fontFamily: 'Newsreader' }}>Beküldött Űrlapok</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left" style={{ color: 'black', fontFamily: 'Newsreader' }}>Űrlap Neve</th>
              <th className="py-2 px-4 border-b border-gray-200 text-right" style={{ color: 'black', fontFamily: 'Newsreader' }}>Letöltés</th>
            </tr>
          </thead>
          <tbody>
            {formList.map(form => (
              <tr key={form.id}>
                <td className="py-2 px-4 border-b border-gray-200" style={{ color: 'black', fontFamily: 'Newsreader' }}>{form.name}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-right">
                  <a href={form.url} download>
                    <button className="bg-blue-500 text-white py-1 px-3 rounded">Letöltés</button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Urlapok;
