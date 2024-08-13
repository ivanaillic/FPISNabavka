import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ikonica from '../assets/ikonica.png';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#f8f9fa', padding: '0.5rem 1rem', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)' }}>
            <div className="container-fluid">
                <div className="navbar-brand d-flex align-items-center">
                    <Link to="/" style={{ textDecoration: 'none', color: '#000000' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', marginRight: '1px' }}>In vino veritas</span>
                    </Link>
                    <img src={ikonica} alt="Ikonica" style={{ width: '80px', height: '70px' }} />
                </div>

                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown me-3">
                            <button
                                className="btn btn-outline-dark dropdown-toggle"
                                type="button"
                                id="dropdownNarudzbenice"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ transition: 'all 0.3s ease', borderColor: '#c82333', color: '#c82333' }}
                                onMouseOver={e => {
                                    e.currentTarget.style.backgroundColor = '#c82333';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#c82333';
                                }}
                            >
                                Narudžbenice
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownNarudzbenice">
                                <li>
                                    <NavLink
                                        className="dropdown-item"
                                        to="/dodaj-narudzbenicu"
                                        style={({ isActive }) => ({
                                            backgroundColor: isActive ? '#c82333' : 'transparent',
                                            color: isActive ? 'white' : 'black',
                                            transition: 'background-color 0.3s ease'
                                        })}
                                    >
                                        Dodaj Narudžbenicu
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="dropdown-item"
                                        to="/prikazi-narudzbenice"
                                        style={({ isActive }) => ({
                                            backgroundColor: isActive ? '#c82333' : 'transparent',
                                            color: isActive ? 'white' : 'black',
                                            transition: 'background-color 0.3s ease'
                                        })}
                                    >
                                        Prikaži Narudžbenice
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown me-5">
                            <button
                                className="btn btn-outline-dark dropdown-toggle"
                                type="button"
                                id="dropdownDobavljaci"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ transition: 'all 0.3s ease', borderColor: '#c82333', color: '#c82333' }}
                                onMouseOver={e => {
                                    e.currentTarget.style.backgroundColor = '#c82333';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#c82333';
                                }}
                            >
                                Dobavljači
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownDobavljaci">
                                <li>
                                    <NavLink
                                        className="dropdown-item"
                                        to="/dodaj-dobavljaca"
                                        style={({ isActive }) => ({
                                            backgroundColor: isActive ? '#c82333' : 'transparent',
                                            color: isActive ? 'white' : 'black',
                                            transition: 'background-color 0.3s ease'
                                        })}
                                    >
                                        Dodaj Dobavljača
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="dropdown-item"
                                        to="/prikazi-dobavljace"
                                        style={({ isActive }) => ({
                                            backgroundColor: isActive ? '#c82333' : 'transparent',
                                            color: isActive ? 'white' : 'black',
                                            transition: 'background-color 0.3s ease'
                                        })}
                                    >
                                        Prikaži Dobavljače
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
