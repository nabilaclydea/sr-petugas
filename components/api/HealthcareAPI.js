import axios from 'axios'
let deploy = 'https://healthcare.cs.ui.ac.id/mobile';
let ip = '10.107.32.250';
let local = 'http://'+ ip + ':8080/mobile'
const HealthcareAPI = axios.create({
    baseURL: deploy
});

export default HealthcareAPI;
