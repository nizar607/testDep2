import axios from 'axios';


export function getPlayer(id: string) {
    return axios.get(`/player/${id}`);
}

export function updatePlayer(id: string, data: any) {
    return axios.put(`/player/${id}`, data);
}

export function deletePlayer(id: string) {
    return axios.delete(`${process.env.REACT_APP_API_URL}/player/delete/${id}`);
}


export function addPlayer(data: any) {
    return axios.post(`${process.env.REACT_APP_API_URL}/player/add`, data);
}

export function getTeams() {
    return axios.get(`${process.env.REACT_APP_API_URL}/team/get-teams-with-players`);
}

// router.patch('/update-team/:id', authenticateUser, async (req, res) => {
// create a patch methode for this

export function updateTeam(id: string, data: any) {
    return axios.patch(`${process.env.REACT_APP_API_URL}/team/update-team/${id}`, data);
}


