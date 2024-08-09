// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './layout/Navbar';
import Home from './components/Home';
import PrikaziDobavljace from './components/PrikaziDobavljace';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DodajDobavljaca from './components/DodajDobavljaca';
import IzmeniDobavljaca from './components/IzmeniDobavljaca';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
