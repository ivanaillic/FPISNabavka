import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class ApiService {
    // Dobavljači
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

    // Gradovi
    getGradovi() {
        return axios.get(`${API_BASE_URL}/gradovi`);
    }

    // Narudžbenice
    getNarudzbenice() {
        return axios.get(`${API_BASE_URL}/api/narudzbenice`);
    }

    getNarudzbenicaById(id) {
        return axios.get(`${API_BASE_URL}/api/narudzbenice/${id}`);
    }

    createNarudzbenica(narudzbenica) {
        return axios.post(`${API_BASE_URL}/api/narudzbenice`, narudzbenica);
    }

    updateNarudzbenica(id, narudzbenica) {
        return axios.put(`${API_BASE_URL}/api/narudzbenice/${id}`, narudzbenica);
    }

    deleteNarudzbenica(id) {
        return axios.delete(`${API_BASE_URL}/api/narudzbenice/${id}`);
    }

    // Stavke narudžbenice

    createStavkaNarudzbenice(stavka) {
        return axios.post(`${API_BASE_URL}/api/stavke-narudzbenice`, stavka);
    }

    updateStavkaNarudzbenice(id, stavka) {
        return axios.put(`${API_BASE_URL}/api/stavke-narudzbenice/${id}`, stavka);
    }

    deleteStavkaNarudzbenice(id) {
        return axios.delete(`${API_BASE_URL}/api/stavke-narudzbenice/${id}`);
    }


    // Zaposleni
    getZaposleni() {
        return axios.get(`${API_BASE_URL}/zaposleni`);
    }

    getZaposleniById(jmbg) {
        return axios.get(`${API_BASE_URL}/zaposleni/${jmbg}`);
    }

    // Materijali
    getMaterijali() {
        return axios.get(`${API_BASE_URL}/materijali`);
    }

    getMaterijalById(sifra) {
        return axios.get(`${API_BASE_URL}/materijal/${sifra}`);
    }
}

export default new ApiService();
