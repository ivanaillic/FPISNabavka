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
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Detalji Narudžbenice</h5>
                </div>
                <div className="card-body">
                    <ul className="list-group mb-4">
                        <li className="list-group-item"><strong>Broj Narudžbenice:</strong> {narudzbenica.brojNarudzbenice}</li>
                        <li className="list-group-item"><strong>Status:</strong> {narudzbenica.statusNarudzbenice}</li>
                        <li className="list-group-item"><strong>Datum Naručivanja:</strong> {narudzbenica.datumNarucivanja}</li>
                        <li className="list-group-item"><strong>Rok Isporuke:</strong> {narudzbenica.rokIsporuke}</li>
                        <li className="list-group-item"><strong>Ukupan Iznos:</strong> {narudzbenica.ukupanIznos}</li>
                        <li className="list-group-item"><strong>Napomena:</strong> {narudzbenica.napomena}</li>
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
                <div className="card-footer">
                    <button type="button" className="btn btn-add-stavka" onClick={handleClose}>Zatvori</button>
                </div>
            </div>
        </div>
    );
};

export default PrikaziNarudzbenicuDetalji;
