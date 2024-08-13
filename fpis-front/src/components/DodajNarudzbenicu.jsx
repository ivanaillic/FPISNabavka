import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';
import './DodajNarudzbenicu.css';

const DodajNarudzbenicu = () => {

    const navigate = useNavigate();
    const [dobavljaci, setDobavljaci] = useState([]);
    const [zaposleni, setZaposleni] = useState([]);
    const [materijali, setMaterijali] = useState([]);
    const [narudzbenica, setNarudzbenica] = useState({
        statusNarudzbenice: 'KREIRANA',
        datumNarucivanja: '',
        rokIsporuke: '',
        ukupanIznos: 0,
        zaposleni: { jmbg: '' },
        dobavljac: { pibDobavljaca: '' },
        napomena: '',
        stavkeNarudzbenice: []
    });
    const [noviMaterijal, setNoviMaterijal] = useState('');
    const [novaKolicina, setNovaKolicina] = useState('');
    const [noviOpis, setNoviOpis] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dobavljaciRes, zaposleniRes, materijaliRes] = await Promise.all([
                    ApiService.getDobavljaci(),
                    ApiService.getZaposleni(),
                    ApiService.getMaterijali()
                ]);

                setDobavljaci(dobavljaciRes.data);
                setZaposleni(zaposleniRes.data);
                setMaterijali(materijaliRes.data);
            } catch (error) {
                console.error('Greska pri ucitavanju:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const total = narudzbenica.stavkeNarudzbenice.reduce((acc, stavka) => {
            const material = materijali.find(m => m.sifraMaterijala === stavka.materijal.sifraMaterijala);
            return acc + (stavka.kolicina * (material ? material.cena : 0));
        }, 0);
        setNarudzbenica(prevState => ({
            ...prevState,
            ukupanIznos: total
        }));
    }, [narudzbenica.stavkeNarudzbenice, materijali]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'zaposleni') {
            setNarudzbenica(prevState => ({
                ...prevState,
                zaposleni: { jmbg: value }
            }));
        } else if (name === 'dobavljac') {
            setNarudzbenica(prevState => ({
                ...prevState,
                dobavljac: { pibDobavljaca: parseInt(value) }
            }));
        } else {
            setNarudzbenica(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleAddStavka = () => {
        if (!noviMaterijal || !novaKolicina || !noviOpis) {
            setError('Sva polja za stavku moraju biti popunjena');
            return;
        }

        const newStavka = {
            id: {
                brojNarudzbenice: null,
                redniBrojStavke: narudzbenica.stavkeNarudzbenice.length + 1
            },
            materijal: {
                sifraMaterijala: parseInt(noviMaterijal)
            },
            kolicina: parseFloat(novaKolicina),
            opis: noviOpis
        };

        setNarudzbenica(prevState => {
            const updatedStavke = [...prevState.stavkeNarudzbenice, newStavka];
            const total = updatedStavke.reduce((acc, stavka) => {
                const material = materijali.find(m => m.sifraMaterijala === stavka.materijal.sifraMaterijala);
                return acc + (stavka.kolicina * (material ? material.cena : 0));
            }, 0);

            return {
                ...prevState,
                stavkeNarudzbenice: updatedStavke,
                ukupanIznos: total
            };
        });
        setNoviMaterijal('');
        setNovaKolicina('');
        setNoviOpis('');
        setError('');
    };

    const handleRemoveStavka = (index) => {
        const newStavke = narudzbenica.stavkeNarudzbenice.filter((_, i) => i !== index);
        setNarudzbenica(prevState => {
            const total = newStavke.reduce((acc, stavka) => {
                const material = materijali.find(m => m.sifraMaterijala === stavka.materijal.sifraMaterijala);
                return acc + (stavka.kolicina * (material ? material.cena : 0));
            }, 0);

            return {
                ...prevState,
                stavkeNarudzbenice: newStavke,
                ukupanIznos: total
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (narudzbenica.stavkeNarudzbenice.length === 0) {
            setError('Morate dodati bar jednu stavku u tabelu pre nego što kreirate narudžbenicu');
            return;
        }

        setError('');

        try {
            await ApiService.createNarudzbenica(narudzbenica);
            alert('Narudzbenica je uspešno kreirana');
            navigate('/prikazi-narudzbenice');
        } catch (error) {
            if (error.response) {
                console.error('Greska pri kreiranju narudzbenice:', error.response.data);
            } else {
                console.error('Greska pri kreiranju narudzbenice:', error.message);
            }
        }
    };

    const handleCancel = () => {
        navigate('/prikazi-narudzbenice');
    };

    return (
        <div className="container mt-4">
            <div className="card p-4" style={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2 className="text-center mb-4" style={{ fontSize: '2rem' }}>Dodaj Narudžbenicu</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row mb-3">
                        <div className="col">
                            <label htmlFor="datumNarucivanja" className="form-label">Datum Naručivanja:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="datumNarucivanja"
                                name="datumNarucivanja"
                                value={narudzbenica.datumNarucivanja}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="rokIsporuke" className="form-label">Rok Isporuke:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="rokIsporuke"
                                name="rokIsporuke"
                                value={narudzbenica.rokIsporuke}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dobavljac" className="form-label">Dobavljač:</label>
                        <select
                            id="dobavljac"
                            name="dobavljac"
                            className="form-select"
                            value={narudzbenica.dobavljac.pibDobavljaca}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Izaberite dobavljača</option>
                            {dobavljaci.map((d, index) => (
                                <option key={index} value={d.pibDobavljaca}>{d.nazivDobavljaca}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ukupanIznos" className="form-label">Ukupan Iznos:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ukupanIznos"
                            name="ukupanIznos"
                            value={narudzbenica.ukupanIznos.toFixed(1)}
                            disabled
                        />
                    </div>
                    <div className="stavke-section">
                        <h5>Dodaj Stavku Narudžbenice</h5>
                        <div className="mb-3">
                            <label htmlFor="noviMaterijal" className="form-label">Materijal:</label>
                            <select
                                id="noviMaterijal"
                                className="form-select"
                                value={noviMaterijal}
                                onChange={(e) => setNoviMaterijal(e.target.value)}
                            >
                                <option value="">Izaberite materijal</option>
                                {materijali.map((m, index) => (
                                    <option key={index} value={m.sifraMaterijala}>{m.nazivMaterijala}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="novaKolicina" className="form-label">Količina:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="novaKolicina"
                                value={novaKolicina}
                                onChange={(e) => setNovaKolicina(e.target.value)}
                                step="0.1"
                                placeholder="Unesite količinu za narudžbenicu"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="noviOpis" className="form-label">Opis:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="noviOpis"
                                value={noviOpis}
                                onChange={(e) => setNoviOpis(e.target.value)}
                                placeholder="Unesite opis za narudžbenicu"
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-add-stavka"
                            onClick={handleAddStavka}
                        >
                            Dodaj Stavku
                        </button>
                    </div>

                    <div className="mb-3">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>RB</th>
                                        <th>Materijal</th>
                                        <th>Količina</th>
                                        <th>Opis</th>
                                        <th>Akcija</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {narudzbenica.stavkeNarudzbenice.map((stavka, index) => (
                                        <tr key={index}>
                                            <td>{stavka.id.redniBrojStavke}</td>
                                            <td>{stavka.materijal.sifraMaterijala}</td>
                                            <td>{stavka.kolicina}</td>
                                            <td>{stavka.opis}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleRemoveStavka(index)}
                                                >
                                                    Ukloni
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="form-row mb-3">
                        <div className="col">
                            <label htmlFor="zaposleni" className="form-label">Zaposleni:</label>
                            <select
                                id="zaposleni"
                                name="zaposleni"
                                className="form-select"
                                value={narudzbenica.zaposleni.jmbg}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Izaberite zaposlenog</option>
                                {zaposleni.map((z, index) => (
                                    <option key={index} value={z.jmbg}>{z.imePrezime}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="napomena" className="form-label">Napomena:</label>
                        <textarea
                            className="form-control"
                            id="napomena"
                            name="napomena"
                            value={narudzbenica.napomena}
                            onChange={handleInputChange}
                            rows="3"
                            placeholder="Unesite napomenu za narudžbenicu"
                        ></textarea>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="form-row mb-3">
                        <div className="col">
                            <button type="submit" className="btn btn-potvrdi">Potvrdi unos</button>
                            <button
                                type="button"
                                className="btn btn-otkazi"
                                onClick={handleCancel}
                            >
                                Otkazi
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default DodajNarudzbenicu;
