import React from 'react';

const DodajStavkuNarudzbenice = ({ index, stavka, materijali, onChange, onRemove }) => {
    const handleStavkaChange = (e) => {
        const { name, value } = e.target;

        if (name === 'materijal') {
            onChange({
                ...stavka,
                [name]: { sifraMaterijala: value }
            });
        } else {
            onChange({
                ...stavka,
                [name]: value
            });
        }
    };

    return (
        <div className="mb-2">
            <div className="mb-2">
                <label htmlFor={`materijal-${index}`} className="form-label">Materijal</label>
                <select
                    id={`materijal-${index}`}
                    name="materijal"
                    className="form-select"
                    value={stavka.materijal.sifraMaterijala}
                    onChange={handleStavkaChange}
                    required
                >
                    <option value="">Izaberite materijal</option>
                    {materijali.map((m, idx) => (
                        <option key={idx} value={m.sifraMaterijala}>{m.nazivMaterijala}</option>
                    ))}
                </select>
            </div>
            <div className="mb-2">
                <label htmlFor={`kolicina-${index}`} className="form-label">Količina</label>
                <input
                    type="number"
                    className="form-control"
                    id={`kolicina-${index}`}
                    name="kolicina"
                    value={stavka.kolicina}
                    onChange={handleStavkaChange}
                    step="0.01"
                    required
                />
            </div>
            <div className="mb-2">
                <label htmlFor={`opis-${index}`} className="form-label">Opis</label>
                <input
                    type="text"
                    className="form-control"
                    id={`opis-${index}`}
                    name="opis"
                    value={stavka.opis}
                    onChange={handleStavkaChange}
                />
            </div>
            <button type="button" className="btn btn-danger mt-2" onClick={onRemove}>Ukloni Stavku</button>
        </div>
    );
};

export default DodajStavkuNarudzbenice;
