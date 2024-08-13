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
        ApiService.getDobavljacById(pib)
            .then(response => {
                console.log('Dobavljac Data:', response.data);
                setDobavljac(response.data);
            })
            .catch(error => {
                console.error('Greska pri ucitavanju dobavljaca', error);
            });

        ApiService.getGradovi()
            .then(response => {
                console.log('Gradovi Data:', response.data);
                setGradovi(response.data);
            })
            .catch(error => {
                console.error('Greska pri ucitavanju gradova', error);
            });
    }, [pib]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'grad') {
            const selectedGrad = gradovi.find(grad => grad.ptt === Number(value));
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
        ApiService.updateDobavljac(pib, dobavljac)
            .then(() => {
                navigate('/dobavljaci');
            })
            .catch(error => {
                console.error('Greska pri azuriranju dobavljaca', error);
            });
    };

    const handleCancel = () => {
        navigate('/prikazi-dobavljace');
    };

    return (
        <div className="container mt-5 mb-5 mx-auto" style={{ width: '100%', maxWidth: '600px', backgroundColor: '#ffffff', padding: '30px', borderRadius: '10px', boxShadow: '0px 0px 20px rgba(0,0,0,0.15)' }}>
            <h2 className="text-center mb-4" style={{ fontSize: '2rem', color: '#343a40' }}>Izmeni Dobavljača</h2>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div className="mb-3">
                    <label htmlFor="pibDobavljaca" style={{ color: '#495057', textAlign: 'left', display: 'block' }}>PIB:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pibDobavljaca"
                        value={dobavljac.pibDobavljaca}
                        disabled
                        style={{ borderRadius: '5px', borderColor: '#ced4da' }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="nazivDobavljaca" style={{ color: '#495057', textAlign: 'left', display: 'block' }}>Naziv:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nazivDobavljaca"
                        name="nazivDobavljaca"
                        value={dobavljac.nazivDobavljaca}
                        onChange={handleChange}
                        placeholder="Unesite naziv dobavljača"
                        required
                        style={{ borderRadius: '5px', borderColor: '#ced4da' }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="telefon" style={{ color: '#495057', textAlign: 'left', display: 'block' }}>Telefon:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="telefon"
                        name="telefon"
                        value={dobavljac.telefon}
                        onChange={handleChange}
                        placeholder="Unesite broj telefona"
                        style={{ borderRadius: '5px', borderColor: '#ced4da' }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="emailDobavljaca" style={{ color: '#495057', textAlign: 'left', display: 'block' }}>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="emailDobavljaca"
                        name="emailDobavljaca"
                        value={dobavljac.emailDobavljaca}
                        onChange={handleChange}
                        placeholder="Unesite email dobavljača"
                        style={{ borderRadius: '5px', borderColor: '#ced4da' }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="tekuciRacun" style={{ color: '#495057', textAlign: 'left', display: 'block' }}>Tekući Račun:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tekuciRacun"
                        name="tekuciRacun"
                        value={dobavljac.tekuciRacun}
                        onChange={handleChange}
                        placeholder="Unesite broj tekućeg računa"
                        required
                        style={{ borderRadius: '5px', borderColor: '#ced4da' }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="grad" style={{ color: '#495057', textAlign: 'left', display: 'block' }}>Grad:</label>
                    <select
                        className="form-select"
                        id="grad"
                        name="grad"
                        value={dobavljac.grad.ptt}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: '5px', borderColor: '#ced4da' }}
                    >
                        <option value="">Izaberite grad</option>
                        {gradovi.map((grad) => (
                            <option key={grad.ptt} value={grad.ptt}>
                                {grad.nazivGrada}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-success" style={{ backgroundColor: '#28a745', borderColor: '#28a745', borderRadius: '5px', fontSize: '1rem', width: '48%' }}>
                        Sačuvaj
                    </button>
                    <button type="button" className="btn btn-danger" style={{ backgroundColor: '#dc3545', borderColor: '#dc3545', borderRadius: '5px', fontSize: '1rem', width: '48%' }} onClick={handleCancel}>
                        Otkaži
                    </button>
                </div>
            </form>
        </div>
    );
};

export default IzmeniDobavljaca;
