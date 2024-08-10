// src/layout/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <a className="navbar-brand" href="#">Vinarija "In vino veritas"</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="btn btn-outline-primary me-2" to="/">Pocetna</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="btn btn-outline-primary me-2" to="/dobavljaci">Prikazi Dobavljace</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="btn btn-outline-primary me-2" to="/dobavljac">Dodaj Dobavljaca</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="btn btn-outline-primary me-2" to="/narudzbenice">Dodaj Narudzbenicu</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="btn btn-outline-primary me-2" to="/prikazi-narudzbenice">Prikazi Narudzbenice</Link> {/* Dodaj ovu stavku */}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
