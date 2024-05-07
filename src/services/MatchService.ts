import axios from 'axios';


export function patchMatch(data: any, matchId: string) {
    return axios.patch(`${process.env.REACT_APP_API_URL}/match/patch-match/${matchId}`, data);
}

export function updateStats(data: any, matchId: string) {
    return axios.patch(`${process.env.REACT_APP_API_URL}/match/update-stats/${matchId}`, data);
}
export function addImageEvent(file: File, matchId: string) {
    const formData = new FormData();
    formData.append('imageEvent', file);
  
    return axios.patch(`${process.env.REACT_APP_API_URL}/match/update-event-image/${matchId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

export function getMatchById(matchId: string) {
    return axios.get(`${process.env.REACT_APP_API_URL}/match/get-match/${matchId}`);
}


export function updateMatchScore(matchId: string, playerId: string) {
    return axios.patch(`${process.env.REACT_APP_API_URL}/match/update-match-score/${matchId}/${playerId}`, {});
}

export function updateRedCard(matchId: string, playerId: string) {
    return axios.patch(`${process.env.REACT_APP_API_URL}/match/update-match-red-card/${matchId}/${playerId}`, {});
}

export function updateCorner(matchId: string, playerId: string) {
    return axios.patch(`${process.env.REACT_APP_API_URL}/match/update-match-corners/${matchId}/${playerId}`, {});
}

export function updateShotOnTarget(matchId: string, playerId: string) {
    return axios.patch(`${process.env.REACT_APP_API_URL}/match/update-match-shot-on-target/${matchId}/${playerId}`, {});
}

export function updateSubstitution(matchId: string, teamId: string, playerId: string, substituteId: string) {
    return axios.patch(`${process.env.REACT_APP_API_URL}/match/update-match-substitutes/${matchId}/${teamId}/${playerId}/${substituteId}`, {});
}

export function updateYellowCard(matchId: string, playerId: string) {
    return axios.patch(`${process.env.REACT_APP_API_URL}/match/update-match-yellow-card/${matchId}/${playerId}`, {});
}


export function updateMatchStatus(matchId: string, divisionId: string, status: string) {
    return axios.patch(`${process.env.REACT_APP_API_URL}/match/update-match-status/${matchId}/${divisionId}`, { status: status });
}





