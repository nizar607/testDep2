import axios from 'axios';


export function addStage(data: any, divisionId: string) {
    return axios.post(`${process.env.REACT_APP_API_URL}/stage/add-stage/${divisionId}`, data);
}


