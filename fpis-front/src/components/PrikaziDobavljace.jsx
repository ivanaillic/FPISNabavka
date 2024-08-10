import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';

const PrikaziDobavljace = () => {
    const [dobavljaci, setDobavljaci] = useState([]);
    const [pretraga, setPretraga] = useState('');
    const [selektovaniDobavljac, setSelektovaniDobavljac] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ApiService.getDobavljaci()
            .then(response => {
                setDobavljaci(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the dobavljaci!', error);
            });
    }, []);

    const handlePretragaChange = (e) => {
        setPretraga(e.target.value);
    };

    const handleRowClick = (dobavljac) => {
        setSelektovaniDobavljac(dobavljac);
    };

    const handleDelete = () => {
        if (selektovaniDobavljac) {
            ApiService.deleteDobavljac(selektovaniDobavljac.pibDobavljaca)
                .then(() => {
                    setDobavljaci(dobavljaci.filter(dobavljac => dobavljac.pibDobavljaca !== selektovaniDobavljac.pibDobavljaca));
                    setSelektovaniDobavljac(null);
                })
                .catch(error => {
                    console.error('There was an error deleting the supplier!', error);
                });
        }
    };

    const handleEdit = () => {
        if (selektovaniDobavljac) {
            navigate(`/izmeni-dobavljaca/${selektovaniDobavljac.pibDobavljaca}`);
        }
    };

    const filtriraniDobavljaci = dobavljaci.filter(dobavljac =>
        dobavljac.nazivDobavljaca.toLowerCase().includes(pretraga.toLowerCase()) ||
        dobavljac.pibDobavljaca.toString().includes(pretraga)
    );

    return (
        <div className="container">
            <h2>Dobavljači</h2>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pretraži po nazivu ili PIB-u"
                    value={pretraga}
                    onChange={handlePretragaChange}
                />
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>PIB</th>
                        <th>Naziv</th>
                        <th>Telefon</th>
                        <th>Email</th>
                        <th>Tekući Račun</th>
                        <th>Grad</th>
                    </tr>
                </thead>
                <tbody>
                    {filtriraniDobavljaci.map(dobavljac => (
                        <tr
                            key={dobavljac.pibDobavljaca}
                            onClick={() => handleRowClick(dobavljac)}
                            className={selektovaniDobavljac && selektovaniDobavljac.pibDobavljaca === dobavljac.pibDobavljaca ? 'table-active' : ''}
                        >
                            <td>{dobavljac.pibDobavljaca}</td>
                            <td>{dobavljac.nazivDobavljaca}</td>
                            <td>{dobavljac.telefon}</td>
                            <td>{dobavljac.emailDobavljaca}</td>
                            <td>{dobavljac.tekuciRacun}</td>
                            <td>{dobavljac.grad ? dobavljac.grad.nazivGrada : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                className="btn btn-warning mt-3 me-2"
                onClick={handleEdit}
                disabled={!selektovaniDobavljac}
            >
                Izmeni Dobavljača
            </button>
            <button
                className="btn btn-danger mt-3"
                onClick={handleDelete}
                disabled={!selektovaniDobavljac}
            >
                Obriši Dobavljača
            </button>
        </div>
    );
};

export default PrikaziDobavljace;
