import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; 
import Iranyelvek from './components/Iranyelvek';
import Bejelentkezés from './components/Bejelentkezés';
import Regisztracio from './components/Regisztracio'; 

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Iranyelvek" element={<Iranyelvek/>} />
          <Route path="/Bejelentkezés" element={<Bejelentkezés/>} />
          <Route path="/Regisztracio" element={<Regisztracio/>}/> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
