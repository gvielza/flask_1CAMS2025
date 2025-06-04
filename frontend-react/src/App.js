import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Formulario from './Formulario';
import Confirmacion from './Confirmacion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
