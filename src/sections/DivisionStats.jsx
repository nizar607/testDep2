import React, { useEffect, useState } from 'react';
import { getDivision } from '../services/DivisionsService';
import { getMatchesByDivision } from '../services/MatchService';
import { getPlayer } from '../services/PlayerService';



function DivisionStats({ divisionId }) {
    const [matches, setMatches] = useState([]);
    const [division, setDivision] = useState(null);
    const [playersStats, setPlayersStats] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;


    const fetchMatches = async () => {
        try {
            const response = await getMatchesByDivision(divisionId);
            const divisionResponse = await getDivision(divisionId);
            const matches = response.data.matches;
            console.log('Matches:', response.data);
            setMatches(matches);
            console.log("matches ", matches)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const fetchDivision = async () => {
        const response = await getDivision(divisionId);
        setDivision(response.data);
    }

    useEffect(() => {
        fetchDivision();
        fetchMatches();
        setPlayersStats([]);
    }, [divisionId]);



    useEffect(() => {
        if (!matches) return;

        const playersStats = {};

        Promise.all(matches.map(async match => {

            const goals = [
                ...match.goals.team1.players.map((p) => { return { _id: p, team: match.team1 } }),
                ...match.goals.team2.players.map((p) => { return { _id: p, team: match.team2 } })
            ];


            const redCards = [
                ...match.cardCounts.team1.red.players.map((p) => { return { _id: p, team: match.team1 } }),
                ...match.cardCounts.team2.red.players.map((p) => { return { _id: p, team: match.team2 } })
            ];

            const yellowCards = [
                ...match.cardCounts.team1.yellow.players.map((p) => { return { _id: p, team: match.team1 } }),
                ...match.cardCounts.team2.yellow.players.map((p) => { return { _id: p, team: match.team2 } })
            ];


            await Promise.all(goals.map(async (player) => {
                if (!playersStats[player._id]) {
                    playersStats[player._id] = 0;
                }
                const playerData = await getPlayer(player._id);
                playersStats[player._id] = {
                    player: playerData.data.player,
                    team: player.team,
                    goals: goals.filter(p => p._id === player._id).length,
                    redCards: redCards.filter(p => p._id === player._id).length,
                    yellowCards: yellowCards.filter(p => p._id === player._id).length,
                };
            }));

            setPlayersStats(playersStats);
            console.log("playersStats ", playersStats);
        }));

        /* console.log(playersGoals);
        
        let sortedPlayersGoals = Object.entries(playersGoals).sort((a, b) => b[1] - a[1]);
    
        console.log(sortedPlayersGoals);
        setPlayersStats(sortedPlayersGoals.splice(0, 5));
        */

    }, [matches]);


    useEffect(() => {
        console.log('playersStats:', playersStats);
    }, [playersStats]);



    if (playersStats?.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <>

            <div>
                <h3>Goals</h3>


                <div className="container table table-dark">
                    <div className="row">
                        <div className="col-6">Players</div>
                        <div className="col-6 text-end">Goals</div>
                    </div>
                    <hr />
                    {Object.entries(playersStats)
                        .sort((a, b) => b[1].goals - a[1].goals)
                        .splice(0, 5)
                        .map(([key, value], i) => {
                            return (
                                <>
                                    <div className="row d-flex align-items-center px-5">
                                        <div className="col-auto">
                                            {i + 1}
                                        </div>
                                        <div className="col-auto">
                                            <div className="row my-3 d-flex align-items-center ps-3">


                                                <div className="col-auto ms-auto">
                                                    <div className="border border-white rounded-circle" >
                                                        <div className="imso_gf__pl-hd-ph">
                                                            <img
                                                                id="dimg_JCYsZrWXGvyo9u8P78m1sAk_25"
                                                                src={`${apiUrl}/${value?.player?.avatar?.replace('\\', '/')}`}
                                                                className="YQ4gaf zr758c"
                                                                height="48" width="48"
                                                                alt="" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-auto">


                                                    <div className="row">
                                                        <div className="col-12 text-white">
                                                            {value?.player?.firstName} {value?.player?.lastName}
                                                        </div>

                                                        <div className="col-12 row text-secondary">
                                                            <img className="col-auto img-fluid"
                                                                alt="team logo"
                                                                src={`${apiUrl}/${value?.team?.logo?.replace('\\', '/')}`}
                                                                style={{ height: "30px", width: "auto" }} />

                                                            <div className="col-auto">
                                                                {value?.team?.name}
                                                            </div>

                                                        </div>

                                                    </div>



                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-auto text-end ms-auto">{value.goals}</div>

                                    </div>
                                    <hr className="row text-secondary mx-4" />
                                </>
                            )
                        })}
                </div>
            </div>

            <div>
                <h3>Red Cards</h3>


                <div className="container table table-dark">
                    <div className="row">
                        <div className="col-6">Players</div>
                        <div className="col-6 text-end">Number Of Cards</div>
                    </div>
                    <hr />
                    {Object.entries(playersStats)
                        .sort((a, b) => b[1].redCards - a[1].redCards)
                        .splice(0, 5)
                        .map(([key, value], i) => {
                            return (
                                <>
                                    <div className="row d-flex align-items-center px-5">
                                        <div className="col-auto">
                                            {i + 1}
                                        </div>
                                        <div className="col-auto">
                                            <div className="row my-3 d-flex align-items-center ps-3">


                                                <div className="col-auto ms-auto">
                                                    <div className="border border-white rounded-circle" >
                                                        <div className="imso_gf__pl-hd-ph">
                                                            <img
                                                                id="dimg_JCYsZrWXGvyo9u8P78m1sAk_25"
                                                                src={`${apiUrl}/${value?.player?.avatar?.replace('\\', '/')}`}
                                                                className="YQ4gaf zr758c"
                                                                height="48" width="48"
                                                                alt="" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-auto">


                                                    <div className="row">
                                                        <div className="col-12 text-white">
                                                            {value?.player?.firstName} {value?.player?.lastName}
                                                        </div>

                                                        <div className="col-12 row text-secondary">
                                                            <img className="col-auto img-fluid"
                                                                alt="team logo"
                                                                src={`${apiUrl}/${value?.team?.logo?.replace('\\', '/')}`}
                                                                style={{ height: "30px", width: "auto" }} />

                                                            <div className="col-auto">
                                                                {value?.team?.name}
                                                            </div>

                                                        </div>

                                                    </div>



                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-auto text-end ms-auto">{value.redCards}</div>

                                    </div>
                                    <hr className="row text-secondary mx-4" />
                                </>
                            )
                        })}
                </div>
            </div>

            <div>
                <h3>Yellow Cards</h3>


                <div className="container table table-dark">
                    <div className="row">
                        <div className="col-6">Players</div>
                        <div className="col-6 text-end">Number Of Cards</div>
                    </div>
                    <hr />
                    {Object.entries(playersStats)
                        .sort((a, b) => b[1].yellowCards - a[1].yellowCards)
                        .splice(0, 5)
                        .map(([key, value], i) => {
                            return (
                                <>
                                    <div className="row d-flex align-items-center px-5">
                                        <div className="col-auto">
                                            {i + 1}
                                        </div>
                                        <div className="col-auto">
                                            <div className="row my-3 d-flex align-items-center ps-3">


                                                <div className="col-auto ms-auto">
                                                    <div className="border border-white rounded-circle" >
                                                        <div className="imso_gf__pl-hd-ph">
                                                            <img
                                                                id="dimg_JCYsZrWXGvyo9u8P78m1sAk_25"
                                                                src={`${apiUrl}/${value?.player?.avatar?.replace('\\', '/')}`}
                                                                className="YQ4gaf zr758c"
                                                                height="48" width="48"
                                                                alt="" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-auto">


                                                    <div className="row">
                                                        <div className="col-12 text-white">
                                                            {value?.player?.firstName} {value?.player?.lastName}
                                                        </div>

                                                        <div className="col-12 row text-secondary">
                                                            <img className="col-auto img-fluid"
                                                                alt="team logo"
                                                                src={`${apiUrl}/${value?.team?.logo?.replace('\\', '/')}`}
                                                                style={{ height: "30px", width: "auto" }} />

                                                            <div className="col-auto">
                                                                {value?.team?.name}
                                                            </div>

                                                        </div>

                                                    </div>



                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-auto text-end ms-auto">{value.yellowCards}</div>

                                    </div>
                                    <hr className="row text-secondary mx-4" />
                                </>
                            )
                        })}
                </div>
            </div>

        </>
    );
}

export default DivisionStats;