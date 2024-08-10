import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

const DodajDobavljaca = () => {
    const [dobavljac, setDobavljac] = useState({
        nazivDobavljaca: '',
        telefon: '',
        emailDobavljaca: '',
        tekuciRacun: '',
        grad: { ptt: '' }
    });

    const [gradovi, setGradovi] = useState([]);

    useEffect(() => {
        ApiService.getGradovi()
            .then(response => setGradovi(response.data))
            .catch(error => console.error('Error fetching cities:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDobavljac(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleGradChange = (e) => {
        const { value } = e.target;
        setDobavljac(prevState => ({
            ...prevState,
            grad: { ptt: value }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        ApiService.createDobavljac(dobavljac)
            .then(response => {
                console.log('Dobavljac successfully created:', response.data);
            })
            .catch(error => {
                console.error('There was an error creating the supplier:', error);
            });
    };

    return (
        <div className="container mt-5">
            <h2>Dodaj Dobavljača</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nazivDobavljaca" className="form-label">Naziv dobavljača</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nazivDobavljaca"
                        name="nazivDobavljaca"
                        value={dobavljac.nazivDobavljaca}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="telefon" className="form-label">Telefon</label>
                    <input
                        type="text"
                        className="form-control"
                        id="telefon"
                        name="telefon"
                        value={dobavljac.telefon}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="emailDobavljaca" className="form-label">Email dobavljača</label>
                    <input
                        type="email"
                        className="form-control"
                        id="emailDobavljaca"
                        name="emailDobavljaca"
                        value={dobavljac.emailDobavljaca}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="tekuciRacun" className="form-label">Tekući račun</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tekuciRacun"
                        name="tekuciRacun"
                        value={dobavljac.tekuciRacun}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="grad" className="form-label">Grad</label>
                    <select
                        className="form-select"
                        id="grad"
                        value={dobavljac.grad.ptt}
                        onChange={handleGradChange}
                        required
                    >
                        <option value="">Izaberite grad</option>
                        {gradovi.map((grad) => (
                            <option key={grad.ptt} value={grad.ptt}>
                                {grad.nazivGrada}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Dodaj Dobavljača
                </button>
            </form>
        </div>
    );
};

export default DodajDobavljaca;
