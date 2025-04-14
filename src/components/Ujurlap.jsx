import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UjUrlap = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ebHivoneve: '',
    ebTorzkonyviNeve: '',
    ebFajtaja: '',
    ebNeme: '',
    ebSzulIdeje: '',
    ebSzine: '',
    chipSorszam: '',
    tulajdonosNeve: '',
    tulajdonosCim: '',
    tulajdonosTel: '',
    tulajdonosEmail: '',
    ivartalanitasIdo: '',
    oltasiIdo: '',
    orvosiBelyegzoSzam: '',
    oltasiKonyvSzam: '',
    oltasiBelyegzoSzam: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/urlapok', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Nem sikerült menteni az űrlapot');
      }

      navigate('/Dashboard/Urlapok');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Új űrlap létrehozása</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kutya adatai */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Kutya adatai</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hívó név</label>
              <input
                type="text"
                name="ebHivoneve"
                value={formData.ebHivoneve}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Törzskönyvi név</label>
              <input
                type="text"
                name="ebTorzkonyviNeve"
                value={formData.ebTorzkonyviNeve}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fajta</label>
              <input
                type="text"
                name="ebFajtaja"
                value={formData.ebFajtaja}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nem</label>
              <select
                name="ebNeme"
                value={formData.ebNeme}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Válassz...</option>
                <option value="kan">Kan</option>
                <option value="szuka">Szuka</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Születési idő</label>
              <input
                type="date"
                name="ebSzulIdeje"
                value={formData.ebSzulIdeje}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Szín</label>
              <input
                type="text"
                name="ebSzine"
                value={formData.ebSzine}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Chip sorszám</label>
              <input
                type="text"
                name="chipSorszam"
                value={formData.chipSorszam}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Tulajdonos adatai */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Tulajdonos adatai</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Név</label>
              <input
                type="text"
                name="tulajdonosNeve"
                value={formData.tulajdonosNeve}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cím</label>
              <input
                type="text"
                name="tulajdonosCim"
                value={formData.tulajdonosCim}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Telefon</label>
              <input
                type="tel"
                name="tulajdonosTel"
                value={formData.tulajdonosTel}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="tulajdonosEmail"
                value={formData.tulajdonosEmail}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Orvosi adatok */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Orvosi adatok</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ivartalanítás időpontja</label>
              <input
                type="date"
                name="ivartalanitasIdo"
                value={formData.ivartalanitasIdo}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Oltási időpont</label>
              <input
                type="date"
                name="oltasiIdo"
                value={formData.oltasiIdo}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Orvosi bélyegző szám</label>
              <input
                type="text"
                name="orvosiBelyegzoSzam"
                value={formData.orvosiBelyegzoSzam}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Oltási könyv szám</label>
              <input
                type="text"
                name="oltasiKonyvSzam"
                value={formData.oltasiKonyvSzam}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Oltási bélyegző szám</label>
              <input
                type="text"
                name="oltasiBelyegzoSzam"
                value={formData.oltasiBelyegzoSzam}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/Dashboard/Urlapok')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Mégse
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Mentés...' : 'Mentés'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UjUrlap;