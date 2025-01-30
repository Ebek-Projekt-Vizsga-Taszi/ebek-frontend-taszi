import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Importáljuk a LandingPage komponenst


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* A gyökér útvonal a LandingPage komponenst jeleníti meg */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
