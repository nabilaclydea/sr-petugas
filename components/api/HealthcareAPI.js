import axios from 'axios'

const HealthcareAPI = axios.create({
    baseURL: 'https://healthcare.cs.ui.ac.id/mobile'
});

export default HealthcareAPI;
