import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';

const IzmeniNarudzbenicu = () => {
    const { id } = useParams();
    const [narudzbenica, setNarudzbenica] = useState(null);
    const [dobavljaci, setDobavljaci] = useState([]);
    const [zaposleni, setZaposleni] = useState([]);
    const [materijali, setMaterijali] = useState([]);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('KREIRANA');
    const [noviMaterijal, setNoviMaterijal] = useState('');
    const [novaKolicina, setNovaKolicina] = useState('');
    const [noviOpis, setNoviOpis] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dobavljaciRes, zaposleniRes, materijaliRes, narudzbenicaRes] = await Promise.all([
                    ApiService.getDobavljaci(),
                    ApiService.getZaposleni(),
                    ApiService.getMaterijali(),
                    ApiService.getNarudzbenicaById(id)
                ]);

                setDobavljaci(dobavljaciRes.data);
                setZaposleni(zaposleniRes.data);
                setMaterijali(materijaliRes.data);

                const narudzbenicaData = narudzbenicaRes.data;
                setNarudzbenica(narudzbenicaData);
                setStatus(narudzbenicaData.statusNarudzbenice || 'KREIRANA');
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

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

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleAddStavka = () => {
        if (!noviMaterijal || !novaKolicina || !noviOpis) {
            return;
        }


        const selectedMaterijal = materijali.find(
            (m) => String(m.sifraMaterijala) === String(noviMaterijal)
        );

        if (!selectedMaterijal) {
            console.error('Selected material not found');
            return;
        }

        const newStavka = {
            id: {
                brojNarudzbenice: narudzbenica.brojNarudzbenice,
                redniBrojStavke: narudzbenica.stavkeNarudzbenice.length + 1
            },
            materijal: {
                sifraMaterijala: selectedMaterijal.sifraMaterijala
            },
            kolicina: parseFloat(novaKolicina),
            opis: noviOpis
        };

        setNarudzbenica(prevState => ({
            ...prevState,
            stavkeNarudzbenice: [...prevState.stavkeNarudzbenice, newStavka]
        }));

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await ApiService.updateNarudzbenica(id, { ...narudzbenica, statusNarudzbenice: status });
            navigate('/prikazi-narudzbenice');
        } catch (error) {
            console.error('Error updating narudzbenica:', error);
            setError('Error updating narudzbenica');
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!narudzbenica) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h2>Izmeni Narudžbenicu</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Status:</label>
                    <div className="form-check form-check-inline">
                        {['KREIRANA', 'IZMENJENA', 'POTPISANA'].map((statusOption) => (
                            <div key={statusOption} className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="status"
                                    id={statusOption}
                                    value={statusOption}
                                    checked={status === statusOption}
                                    onChange={handleStatusChange}
                                />
                                <label className="form-check-label" htmlFor={statusOption}>
                                    {statusOption}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>


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
                        value={narudzbenica.zaposleni?.jmbg || ''}
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
                        value={narudzbenica.dobavljac?.pibDobavljaca || ''}
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
                        value={narudzbenica.napomena || ''}
                        onChange={handleInputChange}
                    ></textarea>
                </div>


                <div className="mb-3">
                    <h5>Dodaj Stavku Narudzbenice</h5>
                    <div className="mb-3">
                        <label htmlFor="materijal" className="form-label">Materijal</label>
                        <select
                            id="materijal"
                            name="materijal"
                            className="form-select"
                            value={noviMaterijal}
                            onChange={(e) => setNoviMaterijal(e.target.value)}
                        >
                            <option value="">Izaberite materijal</option>
                            {materijali.map((m) => (
                                <option key={m.sifraMaterijala} value={m.sifraMaterijala}>
                                    {m.nazivMaterijala}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="kolicina" className="form-label">Količina</label>
                        <input
                            type="number"
                            className="form-control"
                            id="kolicina"
                            name="kolicina"
                            value={novaKolicina}
                            onChange={(e) => setNovaKolicina(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="opis" className="form-label">Opis</label>
                        <input
                            type="text"
                            className="form-control"
                            id="opis"
                            name="opis"
                            value={noviOpis}
                            onChange={(e) => setNoviOpis(e.target.value)}
                        />
                    </div>

                    <button type="button" className="btn btn-primary" onClick={handleAddStavka}>
                        Dodaj stavku
                    </button>
                </div>


                <div className="mb-3">
                    <h5>Stavke Narudzbenice</h5>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Materijal</th>
                                <th>Količina</th>
                                <th>Opis</th>
                                <th>Akcije</th>
                            </tr>
                        </thead>
                        <tbody>
                            {narudzbenica.stavkeNarudzbenice.map((stavka, index) => {
                                const materijal = materijali.find(
                                    (m) => m.sifraMaterijala === stavka.materijal.sifraMaterijala
                                );

                                console.log('Stavka:', stavka);
                                console.log('Materijal found:', materijal);

                                return (
                                    <tr key={index}>
                                        <td>{materijal?.nazivMaterijala || 'Nepoznato'}</td>
                                        <td>{stavka.kolicina}</td>
                                        <td>{stavka.opis}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => handleRemoveStavka(index)}
                                            >
                                                Ukloni
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                </div>


                <button type="submit" className="btn btn-primary">
                    Sačuvaj Izmene
                </button>
            </form>
        </div>
    );
};

export default IzmeniNarudzbenicu;
