import axios from 'axios';


export function getDivisionById(divisionId: string, api_token: string) {
    return axios.get(`${process.env.REACT_APP_API_URL}/division/get-division-byId/${divisionId}`, {
        headers: {
            Authorization: `Bearer ${api_token}`
        }
    });
}
export function verifyDivision(divisionId: string) {
    return axios.get(`${process.env.REACT_APP_API_URL}/division/verify-division/${divisionId}`);
}

export function verifyDivisionChampion(divisionId: string) {
    console.log('verifyDivisionChampion ')
    return axios.get(`${process.env.REACT_APP_API_URL}/division/verify-division-championship/${divisionId}`);
}





