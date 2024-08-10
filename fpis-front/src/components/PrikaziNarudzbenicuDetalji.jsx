import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import { useParams, useNavigate } from 'react-router-dom';

const PrikaziNarudzbenicuDetalji = () => {
    const [narudzbenica, setNarudzbenica] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        ApiService.getNarudzbenicaById(id)
            .then(response => {
                setNarudzbenica(response.data);
            })
            .catch(error => {
                console.error('Greška pri preuzimanju detalja narudžbenice:', error);
            });
    }, [id]);

    const handleClose = () => {
        navigate('/prikazi-narudzbenice');
    };

    if (!narudzbenica) return <div>Učitavanje...</div>;

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="detailsModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="detailsModalLabel">Detalji Narudžbenice</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <ul className="list-group mb-4">
                            <li className="list-group-item"><strong>Broj Narudžbenice:</strong> {narudzbenica.brojNarudzbenice}</li>
                            <li className="list-group-item"><strong>Status:</strong> {narudzbenica.statusNarudzbenice}</li>
                            <li className="list-group-item"><strong>Datum Narudžbe:</strong> {narudzbenica.datumNarucivanja}</li>
                            <li className="list-group-item"><strong>Rok Isporuke:</strong> {narudzbenica.rokIsporuke}</li>
                            <li className="list-group-item"><strong>Ukupno Naručeno:</strong> {narudzbenica.ukupnoNaruceno}</li>
                        </ul>
                        <h5>Stavke Narudžbenice</h5>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Redni Broj</th>
                                    <th>Količina</th>
                                    <th>Opis</th>
                                    <th>Naziv Materijala</th>
                                    <th>Cena</th>
                                    <th>Jedinica Mere</th>
                                </tr>
                            </thead>
                            <tbody>
                                {narudzbenica.stavkeNarudzbenice.map((stavka, index) => (
                                    <tr key={index}>
                                        <td>{stavka.id.redniBrojStavke}</td>
                                        <td>{stavka.kolicina}</td>
                                        <td>{stavka.opis}</td>
                                        <td>{stavka.materijal.nazivMaterijala}</td>
                                        <td>{stavka.materijal.cena}</td>
                                        <td>{stavka.materijal.jedinicaMere}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Zatvori</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrikaziNarudzbenicuDetalji;
