
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export function getTopTeams() {
    return axios.get(`${apiUrl}/teamPoints/top-teams`);
}