import { useEffect, useState } from "react";
import { getPlayer } from "../services/PlayerService";
import { getMatches } from "../services/MatchService";

function TopPlayers() {
    const [matches, setMatches] = useState([]);
    const [playersStats, setPlayersStats] = useState({});
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchMatches = async () => {
        const response = await getMatches();
        setMatches(response.data);
    }

    useEffect(() => {
        fetchMatches();
    }, []);

    useEffect(() => {
        if (!matches) return;

        const playersStats = {};

        Promise.all(matches.map(async match => {
            const goals = [
                ...match.goals.team1.players.map((p) => { return { _id: p, team: match.team1 } }),
                ...match.goals.team2.players.map((p) => { return { _id: p, team: match.team2 } })
            ];

            await Promise.all(goals.map(async (player) => {
                if (!playersStats[player._id]) {
                    playersStats[player._id] = { player: {}, team: {}, goals: 0 };
                }
                const playerData = await getPlayer(player._id);
                playersStats[player._id] = {
                    player: playerData.data.player,
                    team: player.team,
                    goals: goals.filter(p => p._id === player._id).length,
                };
            }));

            setPlayersStats(prevStats => ({ ...prevStats, ...playersStats }));
        }));
    }, [matches]);

    useEffect(() => {
        console.log("playersStats", Object.entries(playersStats)
            .sort((a, b) => b[1].goals - a[1].goals)
            .splice(0, 3));
    }, [playersStats]);

    return (
        <>
            <div className="latest-news">
                <div className="container">
                    <div className="row">
                        <div className="col-12 title-section">
                            <h2 className="heading">Players of The Month</h2>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        {
                            Object.entries(playersStats)
                                .sort((a, b) => b[1].goals - a[1].goals)
                                .splice(0, 3)
                                .map(([key, value], i) => {
                                    return (
                                        <div className="col-md-4" key={key}>
                                            <div className="post-entry">
                                                <a href="#">
                                                    <img src={`${apiUrl}/${value.player.avatar}`} alt="Image" className="img-fluid" />
                                                </a>
                                                <div className="caption">
                                                    <div className="caption-inner">
                                                        <h3 className="mb-3">{value?.player?.name}</h3>
                                                        <div className="author d-flex align-items-center">
                                                            <div className="img mb-2 mr-3">
                                                                <img src={`${apiUrl}/${value?.team?.logo}`}  alt="" />
                                                            </div>
                                                            <div className="text">
                                                                <h4>team : {value?.team?.name}</h4>
                                                                <h4>name : {value.player.firstName}</h4>
                                                                <span>Goals: {value?.goals}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopPlayers;