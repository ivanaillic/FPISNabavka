import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';
import './IzmeniNarudzbenicu.css';


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
    const [napomena, setNapomena] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
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
                setNapomena(narudzbenicaData.napomena || '');
            } catch (error) {
                console.error('Greska pri dohvatanju podataka', error);
                setError('Greska pri dohvatanju podataka');
            }
        };

        fetchData();
    }, [id]);

    const calculateUkupanIznos = () => {
        if (!narudzbenica || !narudzbenica.stavkeNarudzbenice) return 0;

        return narudzbenica.stavkeNarudzbenice.reduce((total, stavka) => {
            const materijal = materijali.find(m => m.sifraMaterijala === stavka.materijal.sifraMaterijala);
            const cena = materijal ? materijal.cena : 0;
            return total + (stavka.kolicina * cena);
        }, 0).toFixed(2);
    };

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
        } else if (name === 'napomena') {
            setNapomena(value);
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
    const handleAddOrUpdateStavka = () => {
        if (!noviMaterijal || !novaKolicina || !noviOpis) {
            return;
        }

        const selectedMaterijal = materijali.find(
            (m) => String(m.sifraMaterijala) === String(noviMaterijal)
        );

        if (!selectedMaterijal) {
            console.error('Izabrani materijal nije pronadjen');
            return;
        }

        const newStavka = {
            id: {
                brojNarudzbenice: narudzbenica.brojNarudzbenice,
                redniBrojStavke: editingIndex !== null ? narudzbenica.stavkeNarudzbenice[editingIndex].id.redniBrojStavke : narudzbenica.stavkeNarudzbenice.length + 1
            },
            materijal: {
                sifraMaterijala: selectedMaterijal.sifraMaterijala,
                nazivMaterijala: selectedMaterijal.nazivMaterijala,
                cena: selectedMaterijal.cena,
                jedinicaMere: selectedMaterijal.jedinicaMere
            },
            kolicina: parseFloat(novaKolicina),
            opis: noviOpis
        };

        const updatedStavke = [...narudzbenica.stavkeNarudzbenice];
        if (editingIndex !== null) {
            updatedStavke[editingIndex] = newStavka;
        } else {
            updatedStavke.push(newStavka);
        }

        setNarudzbenica(prevState => ({
            ...prevState,
            stavkeNarudzbenice: updatedStavke
        }));

        setNoviMaterijal('');
        setNovaKolicina('');
        setNoviOpis('');
        setEditingIndex(null);
    };



    const handleEditStavka = (index) => {
        const stavka = narudzbenica.stavkeNarudzbenice[index];
        setNoviMaterijal(stavka.materijal.sifraMaterijala);
        setNovaKolicina(stavka.kolicina);
        setNoviOpis(stavka.opis);
        setEditingIndex(index);
    };

    const handleRemoveStavka = (index) => {
        const newStavke = narudzbenica.stavkeNarudzbenice.filter((_, i) => i !== index);

        const updatedStavke = newStavke.map((stavka, i) => ({
            ...stavka,
            id: {
                ...stavka.id,
                redniBrojStavke: i + 1
            }
        }));

        setNarudzbenica({
            ...narudzbenica,
            stavkeNarudzbenice: updatedStavke
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const ukupnoIznos = parseFloat(calculateUkupanIznos());
        const updatedNarudzbenica = {
            ...narudzbenica,
            statusNarudzbenice: status,
            ukupanIznos: ukupnoIznos,
            napomena
        };

        console.log("Azurirana narudzbenica:", updatedNarudzbenica);

        try {
            await ApiService.updateNarudzbenica(id, updatedNarudzbenica);
            navigate('/prikazi-narudzbenice');
        } catch (error) {
            console.error('Greska pri azuriranju narudzbenice', error);
            setError('Greska pri azuriranju narudzbenice');
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!narudzbenica) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <div className="card p-4" style={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2>Izmeni Narudžbenicu</h2>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="brojNarudzbenice" className="form-label">Broj Narudžbenice</label>
                        <input
                            type="text"
                            className="form-control"
                            id="brojNarudzbenice"
                            name="brojNarudzbenice"
                            value={narudzbenica.brojNarudzbenice}
                            disabled
                        />
                    </div>

                    <div className="form-group mb-3">
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

                    <div className="form-group mb-3">
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

                    <div className="form-group mb-3">
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

                    <div className="form-group mb-3">
                        <label htmlFor="ukupanIznos" className="form-label">Ukupan Iznos</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ukupanIznos"
                            name="ukupanIznos"
                            value={calculateUkupanIznos()}
                            disabled
                        />
                    </div>


                    <div className="form-group mb-3">
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

                    <div className="stavke-section">
                        <h4>Stavke Narudžbenice</h4>
                        <div className="mb-3">
                            <label htmlFor="redniBrojStavke" className="form-label">Redni broj stavke</label>
                            <input
                                type="number"
                                id="redniBrojStavke"
                                name="redniBrojStavke"
                                className="form-control"
                                value={editingIndex !== null ? narudzbenica.stavkeNarudzbenice[editingIndex].id.redniBrojStavke : ''}
                                disabled
                            />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="noviMaterijal" className="form-label">Materijal</label>
                            <select
                                id="noviMaterijal"
                                name="noviMaterijal"
                                className="form-select"
                                value={noviMaterijal}
                                onChange={(e) => setNoviMaterijal(e.target.value)}
                            >
                                <option value="">Izaberite materijal</option>
                                {materijali.map((m, index) => (
                                    <option key={index} value={m.sifraMaterijala}>
                                        {m.nazivMaterijala}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="novaKolicina" className="form-label">Količina</label>
                            <input
                                type="number"
                                id="novaKolicina"
                                name="novaKolicina"
                                className="form-control"
                                value={novaKolicina}
                                onChange={(e) => setNovaKolicina(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="noviOpis" className="form-label">Opis</label>
                            <input
                                type="text"
                                id="noviOpis"
                                name="noviOpis"
                                className="form-control"
                                value={noviOpis}
                                onChange={(e) => setNoviOpis(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <button
                                type="button"
                                className={`btn btn-${editingIndex !== null ? 'warning' : 'primary'} mt-4`}
                                onClick={handleAddOrUpdateStavka}
                            >
                                {editingIndex !== null ? 'Ažuriraj' : 'Dodaj'} stavku
                            </button>
                        </div>
                    </div>

                    <table className="table table-striped mt-4">
                        <thead>
                            <tr>
                                <th>RB</th>
                                <th>Materijal</th>
                                <th>Cena</th>
                                <th>Jedinica mere</th>
                                <th>Količina</th>
                                <th>Opis</th>
                                <th>Akcije</th>
                            </tr>
                        </thead>
                        <tbody>
                            {narudzbenica.stavkeNarudzbenice.map((stavka, index) => (
                                <tr key={index}>
                                    <td>{stavka.id.redniBrojStavke}</td>
                                    <td>{stavka.materijal.nazivMaterijala}</td>
                                    <td>{stavka.materijal.cena}</td>
                                    <td>{stavka.materijal.jedinicaMere}</td>
                                    <td>{stavka.kolicina}</td>
                                    <td>{stavka.opis}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-warning me-2"
                                            onClick={() => handleEditStavka(index)}
                                        >
                                            Izmeni
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleRemoveStavka(index)}
                                        >
                                            Ukloni
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="form-group mb-3">
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

                    <div className="form-group mb-3">
                        <label htmlFor="napomena" className="form-label">Napomena</label>
                        <textarea
                            className="form-control"
                            id="napomena"
                            name="napomena"
                            value={napomena}
                            onChange={handleInputChange}
                            rows="3"
                        />
                    </div>

                    <div className="mt-4">
                        <button type="submit" className="btn btn-success">Sačuvaj narudžbenicu</button>
                        <button type="button" className="btn btn-danger" onClick={() => navigate('/prikazi-narudzbenice')}>
                            Otkaži
                        </button>
                    </div>
                </form >
            </div >
        </div >

    );
};

export default IzmeniNarudzbenicu;