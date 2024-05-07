import axios from 'axios';


export function addGroup(data: any, stageId: string) {
    return axios.post(`${process.env.REACT_APP_API_URL}/group/add-group/${stageId}`, data);
}


