import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import { useNavigate } from 'react-router-dom';

const PrikaziNarudzbenice = () => {
    const [narudzbenice, setNarudzbenice] = useState([]);
    const [search, setSearch] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [selectedNarudzbenicaId, setSelectedNarudzbenicaId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNarudzbenice();
    }, []);

    const fetchNarudzbenice = () => {
        ApiService.getNarudzbenice()
            .then(response => {
                setNarudzbenice(response.data);
            })
            .catch(error => {
                console.error('Greška pri preuzimanju narudžbenica:', error);
                setAlertMessage('Greška pri preuzimanju narudžbenica.');
                setAlertType('danger');
            });
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleRowClick = (id) => {
        setSelectedNarudzbenicaId(id);
    };

    const handleDelete = () => {
        if (selectedNarudzbenicaId) {
            const selectedNarudzbenica = narudzbenice.find(n => n.brojNarudzbenice === selectedNarudzbenicaId);
            if (selectedNarudzbenica.statusNarudzbenice === 'KREIRANA' || selectedNarudzbenica.statusNarudzbenice === 'IZMENJENA') {
                setShowModal(true);
            } else {
                setAlertMessage('Narudžbenica ne može biti obrisana jer nije u odgovarajućem statusu.');
                setAlertType('warning');
            }
        } else {
            setAlertMessage('Molimo izaberite narudžbenicu.');
            setAlertType('warning');
        }
    };

    const confirmDelete = () => {
        if (selectedNarudzbenicaId) {
            ApiService.deleteNarudzbenica(selectedNarudzbenicaId)
                .then(() => {
                    fetchNarudzbenice();
                    setAlertMessage('Narudžbenica uspešno obrisana.');
                    setAlertType('success');
                })
                .catch(error => {
                    console.error('Greška pri brisanju narudžbenice:', error);
                    setAlertMessage('Greška pri brisanju narudžbenice.');
                    setAlertType('danger');
                });
            setShowModal(false);
            setSelectedNarudzbenicaId(null);
        }
    };

    const cancelDelete = () => {
        setShowModal(false);
        setSelectedNarudzbenicaId(null);
    };

    const handleViewDetails = () => {
        if (selectedNarudzbenicaId) {
            navigate(`/prikazi-narudzbenicu/${selectedNarudzbenicaId}`);
        } else {
            setAlertMessage('Molimo izaberite narudžbenicu.');
            setAlertType('warning');
        }
    };

    const handleEdit = () => {
        const selectedNarudzbenica = narudzbenice.find(n => n.brojNarudzbenice === selectedNarudzbenicaId);
        if (selectedNarudzbenicaId) {
            if (selectedNarudzbenica.statusNarudzbenice === 'KREIRANA' || selectedNarudzbenica.statusNarudzbenice === 'IZMENJENA') {
                navigate(`/izmeni-narudzbenicu/${selectedNarudzbenicaId}`);
            } else {
                setAlertMessage('Nije odgovarajući status.');
                setAlertType('warning');
            }
        } else {
            setAlertMessage('Molimo izaberite narudžbenicu za izmenu.');
            setAlertType('warning');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Narudžbenice</h2>
            {alertMessage && (
                <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
                    {alertMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pretraži po broju narudžbenice"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Broj Narudžbenice</th>
                        <th>Status</th>
                        <th>Dobavljač</th>
                        <th>Ukupan Iznos</th>
                        <th>Zaposleni</th>

                    </tr>
                </thead>
                <tbody>
                    {narudzbenice
                        .filter(narudzbenica =>
                            narudzbenica.brojNarudzbenice.toString().includes(search)
                        )
                        .map(narudzbenica => (
                            <tr
                                key={narudzbenica.brojNarudzbenice}
                                className={selectedNarudzbenicaId === narudzbenica.brojNarudzbenice ? 'table-active' : ''}
                                onClick={() => handleRowClick(narudzbenica.brojNarudzbenice)}
                                style={{ cursor: 'pointer' }}
                            >
                                <td>{narudzbenica.brojNarudzbenice}</td>
                                <td>{narudzbenica.statusNarudzbenice}</td>
                                <td>{narudzbenica.dobavljac ? narudzbenica.dobavljac.nazivDobavljaca : 'N/A'}</td>
                                <td>{narudzbenica.ukupanIznos}</td>
                                <td>{narudzbenica.zaposleni ? narudzbenica.zaposleni.imePrezime : 'N/A'}</td>

                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-primary" onClick={handleViewDetails}>Prikazi Narudžbenicu</button>
                <button className="btn btn-warning me-2" onClick={handleEdit}>Izmeni Narudžbenicu</button>
                <button className="btn btn-danger" onClick={handleDelete}>Obriši Narudžbenicu</button>
            </div>
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Potvrda Brisanja</h5>
                                <button type="button" className="btn-close" onClick={cancelDelete}></button>
                            </div>
                            <div className="modal-body">
                                Da li ste sigurni da želite da obrišete ovu narudžbenicu?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Odustani</button>
                                <button type="button" className="btn btn-primary" onClick={confirmDelete}>Potvrdi</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrikaziNarudzbenice;
