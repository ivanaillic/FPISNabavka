// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './layout/Navbar';
import Home from './components/Home';
import PrikaziDobavljace from './components/PrikaziDobavljace';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DodajDobavljaca from './components/DodajDobavljaca';
import IzmeniDobavljaca from './components/IzmeniDobavljaca';
import DodajNarudzbenicu from './components/DodajNarudzbenicu';
import PrikaziNarudzbenice from './components/PrikaziNarudzbenice';
import PrikaziNarudzbenicuDetalji from './components/PrikaziNarudzbenicuDetalji';
import IzmeniNarudzbenicu from './components/IzmeniNarudzbenicu';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dobavljaci" element={<PrikaziDobavljace />} />
          <Route path="/dobavljac" element={<DodajDobavljaca />} />
          <Route path="/izmeni-dobavljaca/:pib" element={<IzmeniDobavljaca />} />
          <Route path="/narudzbenice" element={<DodajNarudzbenicu />} />
          <Route path="/prikazi-narudzbenice" element={<PrikaziNarudzbenice />} />
          <Route path="/prikazi-narudzbenicu/:id" element={<PrikaziNarudzbenicuDetalji />} />
          <Route path="/izmeni-narudzbenicu/:id" element={<IzmeniNarudzbenicu />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
