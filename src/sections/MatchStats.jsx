import { useEffect } from "react";
import { useState } from "react";



function MatchStats({ match }) {
    const [team1, setTeam1] = useState({
        shotsOnTarget: 0,
        possession: 0,
        yellowCards: 0,
        redCards: 0,
        corners: 0,
        averageSpeed: 0,
        averageDistance: 0
    });
    const [team2, setTeam2] = useState({
        shotsOnTarget: 0,
        possession: 0,
        yellowCards: 0,
        redCards: 0,
        corners: 0,
        averageSpeed: 0,
        averageDistance: 0
    });

    useEffect(() => {
        console.log('match:', match);
        if (!match) return;

        setTeam1(prevState => ({
            ...prevState,
            yellowCards: match.events.filter(
                (_event) => _event.action == "yellow" &&
                    (match.team1.players.filter((player) => _event.player._id == player._id).length
                        || match.team1.subtitutes.filter((substitute) => _event.player._id == substitute._id).length)
            ).length,

            redCards: match.events.filter(
                (_event) => _event.action == "red" &&
                    (match.team1.players.filter((player) => _event.player._id == player._id).length
                        || match.team1.subtitutes.filter((substitute) => _event.player._id == substitute._id).length)
            ).length,

            corners: match.events.filter(
                (_event) => _event.action == "corner" &&
                    (match.team1.players.filter((player) => _event.player._id == player._id).length
                        || match.team1.subtitutes.filter((substitute) => _event.player._id == substitute._id).length)
            ).length,

            shotsOnTarget: match.events.filter(
                (_event) => _event.action == "shot-on-target" &&
                    (match.team1.players.filter((player) => _event.player._id == player._id).length
                        || match.team1.subtitutes.filter((substitute) => _event.player._id == substitute._id).length)
            ).length,
        }));

        setTeam2(prevState => ({
            ...prevState,
            yellowCards: match.events.filter(
                (_event) => _event.action == "yellow" &&
                    (
                        match.team2.players.filter((player) => _event.player._id == player._id).length
                        || match.team2.subtitutes.filter((substitute) => _event.player._id == substitute._id).length
                    )
            ).length,

            redCards: match.events.filter(
                (_event) => _event.action == "red" &&
                    (match.team2.players.filter((player) => _event.player._id == player._id).length
                        || match.team2.subtitutes.filter((substitute) => _event.player._id == substitute._id).length)
            ).length,

            corners: match.events.filter(
                (_event) => _event.action == "corner" &&
                    (match.team2.players.filter((player) => _event.player._id == player._id).length
                        || match.team2.subtitutes.filter((substitute) => _event.player._id == substitute._id).length)
            ).length,

            shotsOnTarget: match.events.filter(
                (_event) => _event.action == "shot-on-target" &&
                    (match.team2.players.filter((player) => _event.player._id == player._id).length
                        || match.team2.subtitutes.filter((substitute) => _event.player._id == substitute._id).length)
            ).length,
        }));


    }, [match]);



    return (

        /*
                stats
                    :
                    team1_average_distance
        : 
        21.119335573129128
                team1_average_speed
                    :
                    5.275304966148596
        team1_possession
                    :
                    58.4
        team2_average_distance
                    :
                    22.432748472886356
        team2_average_speed
                    :
                    6.063164585251825
        team2_possession
                    :
                    41.6
*/

        <div className="container text-white pb-5" >
            <div className="row d-flex justify-content-between m-4">
                <div className="col-auto"> {team1.shotsOnTarget}</div>
                <div className="col-auto">shots on target</div>
                <div className="col-auto">{team2.shotsOnTarget}</div>
            </div>

            <div className="row d-flex justify-content-between m-4">
                <div className="col-auto"> {match?.stats?.team1_possession ? match?.stats?.team1_possession.toFixed(2) + "%" : "no data yet"}</div>
                <div className="col-auto">possession</div>
                <div className="col-auto"> {match?.stats?.team2_possession ? match?.stats?.team2_possession.toFixed(2) + "%" : "no data yet"}</div>
            </div>

            <div className="row d-flex justify-content-between m-4">
                <div className="col-auto">{team1.yellowCards}</div>
                <div className="col-auto"> yellow cards </div>
                <div className="col-auto">{team2.yellowCards}</div>
            </div>

            <div className="row d-flex justify-content-between m-4">
                <div className="col-auto"> {team1.redCards}</div>
                <div className="col-auto">red cards</div>
                <div className="col-auto">{team2.redCards}</div>
            </div>

            <div className="row d-flex justify-content-between m-4">
                <div className="col-auto"> {team1.corners}</div>
                <div className="col-auto"> corners</div>
                <div className="col-auto">{team2.corners}</div>
            </div>

            <div className="row d-flex justify-content-between m-4">
                <div className="col-auto">{match?.stats?.team1_average_speed ? match?.stats?.team1_average_speed.toFixed(2) + "km/h" : "no data yet"}</div>
                <div className="col-auto">average speed</div>
                <div className="col-auto">{match?.stats?.team2_average_speed ? match?.stats?.team2_average_speed.toFixed(2) + "km/h" : "no data yet"}</div>
            </div>

            <div className="row d-flex justify-content-between m-4">
                <div className="col-auto">{match?.stats?.team1_average_distance ? match?.stats?.team1_average_distance.toFixed(2) + "km" : "no data yet"}</div>
                <div className="col-auto">average distance</div>
                <div className="col-auto">{match?.stats?.team2_average_distance ? match?.stats?.team2_average_distance.toFixed(2) + "km" : "no data yet"}</div>
            </div>



        </div>
    )
}

export default MatchStats;