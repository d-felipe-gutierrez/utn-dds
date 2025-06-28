import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from  'react-router-dom';
import Inicio from './components/Inicio';
import Listado from './components/Listado';
import Producto from './components/Producto';
import Error404 from './components/NotFound';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/listado" element={<Listado />} />
          <Route path="/producto/:id" element={<Producto />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
