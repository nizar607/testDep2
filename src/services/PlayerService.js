
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;


export function getPlayer(playerId) {
    return axios.get(`${apiUrl}/player/get-player/${playerId}`);
}