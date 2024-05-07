

import React, { useEffect, useState } from 'react';
import { getTopTeams } from '../services/TeamPointsService';

function TopTeams() {
    const [teams, setTeams] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const fetchTopTeams = async () => {
        const response = await getTopTeams();
        setTeams(response.data);
    }
    useEffect(() => {
        // fetch all teams using axios
        fetchTopTeams();
    }, []);
    return (
        <div className="row d-flex justify-content-center">
            {teams.map((value, index) => (
                <div className="col-lg-8 my-3" key={index}>
                    <div className="widget-next-match">
                        <div className="widget-title">
                            <h3>{value?.team.name}</h3>
                        </div>
                        <div className="widget-body mb-3">
                            <div className="widget-vs">
                                <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                                    <div className="team-1 text-center">
                                        <img src={`${apiUrl}/${value.team.logo}`} alt="Image" />
                                        <h3>{value?.name}</h3>
                                    </div>
                                    <div>
                                        <span className="vs"><span>{value.totalPoints}</span></span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TopTeams;