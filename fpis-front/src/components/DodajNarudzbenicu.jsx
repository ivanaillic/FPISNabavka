import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import './DodajNarudzbenicu.css';

const DodajNarudzbenicu = () => {
    const [dobavljaci, setDobavljaci] = useState([]);
    const [zaposleni, setZaposleni] = useState([]);
    const [materijali, setMaterijali] = useState([]);
    const [narudzbenica, setNarudzbenica] = useState({
        statusNarudzbenice: 'KREIRANA',
        datumNarucivanja: '',
        rokIsporuke: '',
        ukupnoNaruceno: 0,
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
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const total = narudzbenica.stavkeNarudzbenice.reduce((acc, stavka) => acc + stavka.kolicina, 0);
        setNarudzbenica(prevState => ({
            ...prevState,
            ukupnoNaruceno: total
        }));
    }, [narudzbenica.stavkeNarudzbenice]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'zaposleni') {
            setNarudzbenica({
                ...narudzbenica,
                zaposleni: { jmbg: value }
            });
        } else if (name === 'dobavljac') {
            setNarudzbenica({
                ...narudzbenica,
                dobavljac: { pibDobavljaca: parseInt(value) }
            });
        } else {
            setNarudzbenica({
                ...narudzbenica,
                [name]: value
            });
        }
    };

    const handleAddStavka = () => {
        if (!noviMaterijal || !novaKolicina || !noviOpis) {
            return; // Opcionalno: dodaj validaciju da li su svi unosi popunjeni
        }

        const newStavka = {
            id: {
                brojNarudzbenice: null,  // Ovo će biti postavljeno od strane backenda
                redniBrojStavke: narudzbenica.stavkeNarudzbenice.length + 1 // Generiši jedinstven broj
            },
            materijal: {
                sifraMaterijala: noviMaterijal
            },
            kolicina: parseFloat(novaKolicina),
            opis: noviOpis
        };

        setNarudzbenica(prevState => ({
            ...prevState,
            stavkeNarudzbenice: [...prevState.stavkeNarudzbenice, newStavka]
        }));

        // Očisti input polja
        setNoviMaterijal('');
        setNovaKolicina('');
        setNoviOpis('');
    };

    const handleRemoveStavka = (index) => {
        const newStavke = narudzbenica.stavkeNarudzbenice.filter((_, i) => i !== index);
        setNarudzbenica({
            ...narudzbenica,
            stavkeNarudzbenice: newStavke
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (narudzbenica.stavkeNarudzbenice.length === 0) {
            setError('Morate dodati bar jednu stavku u tabelu pre nego što kreirate narudžbenicu.');
            return;
        }

        setError(''); // Očisti prethodne greške

        try {
            await ApiService.createNarudzbenica(narudzbenica);
            alert('Narudzbenica je uspešno kreirana!');
        } catch (error) {
            if (error.response) {
                console.error('Error creating narudzbenica:', error.response.data);
            } else {
                console.error('Error creating narudzbenica:', error.message);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Dodaj Narudzbenicu</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields for Narudzbenica */}
                <div className="mb-3">
                    <label htmlFor="datumNarucivanja" className="form-label">Datum Narucivanja</label>
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
                <div className="mb-3">
                    <label htmlFor="rokIsporuke" className="form-label">Rok Isporuke</label>
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
                <div className="mb-3">
                    <label htmlFor="ukupnoNaruceno" className="form-label">Ukupno Naruceno</label>
                    <input
                        type="text"
                        className="form-control"
                        id="ukupnoNaruceno"
                        name="ukupnoNaruceno"
                        value={narudzbenica.ukupnoNaruceno}
                        readOnly
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="zaposleni" className="form-label">Zaposleni</label>
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
                <div className="mb-3">
                    <label htmlFor="dobavljac" className="form-label">Dobavljač</label>
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
                    <label htmlFor="napomena" className="form-label">Napomena</label>
                    <textarea
                        className="form-control"
                        id="napomena"
                        name="napomena"
                        value={narudzbenica.napomena}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                {/* Stavke Narudzbenice */}
                <div className="mb-3">
                    <h5>Dodaj Stavku Narudzbenice</h5>
                    <div className="mb-3">
                        <label htmlFor="noviMaterijal" className="form-label">Materijal</label>
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
                        <label htmlFor="novaKolicina" className="form-label">Količina</label>
                        <input
                            type="number"
                            className="form-control"
                            id="novaKolicina"
                            value={novaKolicina}
                            onChange={(e) => setNovaKolicina(e.target.value)}
                            step="0.01"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="noviOpis" className="form-label">Opis</label>
                        <input
                            type="text"
                            className="form-control"
                            id="noviOpis"
                            value={noviOpis}
                            onChange={(e) => setNoviOpis(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleAddStavka}
                    >
                        Dodaj Stavku
                    </button>
                </div>

                {/* Prikaz stavki u tabeli */}
                <div className="mb-3">
                    <h5>Stavke Narudzbenice</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
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

                {error && <div className="alert alert-danger">{error}</div>}

                <button type="submit" className="btn btn-primary">Kreiraj Narudzbenicu</button>
            </form>
        </div>
    );
};

export default DodajNarudzbenicu;
