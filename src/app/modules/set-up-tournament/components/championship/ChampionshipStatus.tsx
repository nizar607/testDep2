import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StandingTeams from '../mixedTournamentMatchesConfig/StandingTeams';
import { verifyDivisionChampion } from '../../../../../services/DivisionService';
import ParticleBg from '../ParticleBg';


function ChampionshipStatus() {
    const { divisionId } = useParams<{ divisionId: string }>();
    const [teams, setTeams] = useState<any>();
    const [firstPlace, setFirstPlace] = useState<any>();

    const fetchFisrtPlace = async () => {
        console.log('divisionId ', divisionId)
        console.log('resulty ');
        const result = await verifyDivisionChampion(divisionId as any);
        console.log('result ', result);
        const firstTeamSelected = await axios.get("http://localhost:3001/team/get-team/" + result.data);
        setFirstPlace(firstTeamSelected.data.team);
    }
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/division/division/teams/${divisionId}`);
                console.log('teams', response.data);
                const data = await response.data;
                setTeams(data);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };
        fetchTeams();
        fetchFisrtPlace();
    }, []);
    {
        if (!teams || !firstPlace) {
            return <div>Loading...</div>
        }
    }

    return (
        <>
            <div className="div" >
                <ParticleBg />
            </div>
            <div className="container my-5">
                <div className="container">
                    <div className="row">
                        <h1>First Place</h1>
                        <div
                            className="row align-items-center justify-content-center">
                            <div className="col-2 align-self-center">
                                <h1>Team: {firstPlace?.name}</h1>
                                <img src={`${process.env.REACT_APP_API_URL}/${firstPlace?.logo?.replace('\\', '/')}`} className="img-fluid" alt={firstPlace.name} />
                            </div>
                        </div>
                    </div>
                </div>
                <StandingTeams teams={teams} />
            </div>
        </>
    )
}
export default ChampionshipStatus;