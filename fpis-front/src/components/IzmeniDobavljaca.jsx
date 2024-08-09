import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';

const IzmeniDobavljaca = () => {
    const { pib } = useParams();
    const navigate = useNavigate();
    const [dobavljac, setDobavljac] = useState({
        pibDobavljaca: '',
        nazivDobavljaca: '',
        telefon: '',
        emailDobavljaca: '',
        tekuciRacun: '',
        grad: {
            ptt: '',
            nazivGrada: ''
        }
    });
    const [gradovi, setGradovi] = useState([]);

    useEffect(() => {
        // Učitajte podatke o dobavljaču
        ApiService.getDobavljacById(pib)
            .then(response => {
                console.log('Dobavljac Data:', response.data); // Proverite šta se dobija kao odgovor
                setDobavljac(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the supplier!', error);
            });

        // Učitajte gradove za combo box
        ApiService.getGradovi()
            .then(response => {
                console.log('Gradovi Data:', response.data); // Proverite šta se dobija kao odgovor
                setGradovi(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the cities!', error);
            });
    }, [pib]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'grad') {
            const selectedGrad = gradovi.find(grad => grad.ptt === Number(value)); // Konverzija u broj (Long tip)
            console.log('Selected Grad:', selectedGrad);
            setDobavljac(prevState => ({
                ...prevState,
                grad: selectedGrad || { ptt: '', nazivGrada: '' }
            }));
        } else {
            setDobavljac(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Ažuriranje dobavljača sa izabranim gradom
        console.log('Dobavljac before update:', dobavljac); // Proverite stanje pre ažuriranja
        ApiService.updateDobavljac(pib, dobavljac)
            .then(() => {
                navigate('/dobavljaci');
            })
            .catch(error => {
                console.error('There was an error updating the supplier!', error);
            });
    };

    return (
        <div className="container">
            <h2>Izmeni Dobavljača</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>PIB:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={dobavljac.pibDobavljaca}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Naziv:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nazivDobavljaca"
                        value={dobavljac.nazivDobavljaca}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Telefon:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="telefon"
                        value={dobavljac.telefon}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        name="emailDobavljaca"
                        value={dobavljac.emailDobavljaca}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Tekući Račun:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="tekuciRacun"
                        value={dobavljac.tekuciRacun}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Grad:</label>
                    <select
                        className="form-control"
                        name="grad"
                        value={dobavljac.grad.ptt}
                        onChange={handleChange}
                    >
                        <option value="">Izaberite grad</option>
                        {gradovi.map(grad => (
                            <option key={grad.ptt} value={grad.ptt}>
                                {grad.nazivGrada}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Sačuvaj</button>
            </form>
        </div>
    );
};

export default IzmeniDobavljaca;
