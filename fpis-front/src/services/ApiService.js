import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

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
}

export default new ApiService();
