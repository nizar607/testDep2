
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export function getDivisionsByTournament(tournamentId) {
    return axios.get(`${apiUrl}/division/front/divisions/${tournamentId}`);
}


export function getDivision(divisionId) {
    return axios.get(`${apiUrl}/division/get-division-byId/${divisionId}`);
} 
