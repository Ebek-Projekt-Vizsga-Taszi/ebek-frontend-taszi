import React from "react";

const Profil = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Profil Információk</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            E-mail cím:
          </label>
          <input className="w-full p-2 border border-gray-300 rounded" type="email" id="email" name="email" />
        </div>
      </form>

      <h2 className="text-3xl font-bold mb-4 mt-8">Jelszó módosítása</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="currentPassword">
            Jelenlegi jelszó:
          </label>
          <input className="w-full p-2 border border-gray-300 rounded" type="password" id="currentPassword" name="currentPassword" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="newPassword">
            Új jelszó:
          </label>
          <input className="w-full p-2 border border-gray-300 rounded" type="password" id="newPassword" name="newPassword" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="confirmPassword">
            Jelszó megerősítése:
          </label>
          <input className="w-full p-2 border border-gray-300 rounded" type="password" id="confirmPassword" name="confirmPassword" />
        </div>
        <button type="button" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Jelszó mentése
        </button>
      </form>
    </div>
  );
};

export default Profil;
