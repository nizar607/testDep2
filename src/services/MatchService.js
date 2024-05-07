
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export function getDivisionsByTournament(tournamentId) {
    return axios.get(`${apiUrl}/division/front/divisions/${tournamentId}`);
}


export function getDivision(divisionId) {
    return axios.get(`${apiUrl}/division/get-division-byId/${divisionId}`);
}

export function getMatchesByDivision(divisionId) {

    return axios.get(`${apiUrl}/match/front/getMatches/${divisionId}`);

}


export function getMatch(matchId) {
    return axios.get(`${apiUrl}/match/get-match/${matchId}`);
}

export function getMatches() {
    return axios.get(`${apiUrl}/match/get-matches`);
}
