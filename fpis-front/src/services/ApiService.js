import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
    getDobavljaci() {
        return axios.get(`${API_BASE_URL}/dobavljaci`);
    }

    getDobavljacById(pib) {
        return axios.get(`${API_BASE_URL}/dobavljac/${pib}`);
    }

    createDobavljac(dobavljac) {
        return axios.post(`${API_BASE_URL}/dobavljac`, dobavljac);
    }

    updateDobavljac(pib, dobavljac) {
        return axios.put(`${API_BASE_URL}/dobavljac/${pib}`, dobavljac);
    }

    deleteDobavljac(pib) {
        return axios.delete(`${API_BASE_URL}/dobavljac/${pib}`);
    }

    getGradovi() {
        return axios.get(`${API_BASE_URL}/gradovi`);
    }

    getNarudzbenice() {
        return axios.get(`${API_BASE_URL}/narudzbenice`);
    }

    getNarudzbenicaById(id) {
        return axios.get(`${API_BASE_URL}/narudzbenice/${id}`);
    }

    createNarudzbenica(narudzbenica) {
        return axios.post(`${API_BASE_URL}/narudzbenice`, narudzbenica);
    }

    updateNarudzbenica(id, narudzbenica) {
        return axios.put(`${API_BASE_URL}/narudzbenice/${id}`, narudzbenica);
    }

    deleteNarudzbenica(id) {
        return axios.delete(`${API_BASE_URL}/narudzbenice/${id}`);
    }

    createStavkaNarudzbenice(stavka) {
        return axios.post(`${API_BASE_URL}/stavke-narudzbenice`, stavka);
    }

    updateStavkaNarudzbenice(id, stavka) {
        return axios.put(`${API_BASE_URL}/stavke-narudzbenice/${id}`, stavka);
    }

    deleteStavkaNarudzbenice(id) {
        return axios.delete(`${API_BASE_URL}/stavke-narudzbenice/${id}`);
    }

    getZaposleni() {
        return axios.get(`${API_BASE_URL}/zaposleni`);
    }

    getZaposleniById(jmbg) {
        return axios.get(`${API_BASE_URL}/zaposleni/${jmbg}`);
    }

    getMaterijali() {
        return axios.get(`${API_BASE_URL}/materijali`);
    }

    getMaterijalById(sifra) {
        return axios.get(`${API_BASE_URL}/materijal/${sifra}`);
    }
}

export default new ApiService();
