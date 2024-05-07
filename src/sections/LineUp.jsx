import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol } from '@fortawesome/free-regular-svg-icons'
import { faFutbolBall, faScaleBalanced, faSquare } from '@fortawesome/free-solid-svg-icons'
import { getMatch } from "../services/MatchService";
import io from 'socket.io-client';
import './LineUpStyle.css';


const LineUp = ({ match }) => {

    const [showVideo, setShowVideo] = useState(false);
    const videoRef = useRef();
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    const [teams, setTeams] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;



    useEffect(() => {

        console.log("response", match);

        if (match) {
            setLoading(false);
            const data = [];
            for (let i = 1, j = 0; i < 27; i++, j++) {

                data.push({
                    _id: -i,
                    playerNumber: -i,
                    firstName: "blank",
                    lastName: "blank",
                    phoneNumber: "blank",
                    email: "blank",
                    age: 0,
                    height: 0,
                    country: "blank",
                    position: "blank",
                    blank: true
                });



                const team1Data = {
                    ...match.team1,
                    players: match?.team1?.players || []
                };
                const team2Data = {
                    ...match.team2,
                    players: match?.team2?.players || []
                };

                const data1 = [...data];
                const data2 = [...data];

                team1Data.players.map((player) => { data1[player.position] = player; });
                team2Data.players.map((player) => { data2[player.position] = player; });

                team1Data.players = data1;
                team2Data.players = data2;
                setTeams([team1Data, team2Data]);
            }
        }

    }, [match]);
    useEffect(() => {
        console.log("teams:", teams)
    }, [teams])

    useEffect(() => {
        console.log("match:", match)
    }, [match])
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div decode-data-ved="1" data-ved="2ahUKEwiRsKfI8uCFAxWBgP0HHXzrBh8QpNICegQIARAA">
            <div className="imso-ani tb_cbg soccer-match-lineups" jscontroller="MlPvHd" id="match-lineups" jsaction="rcuQ6b:npT2md">
                <div jsname="bN97Pc">
                    <div className="lr-imso-ls-wd">
                        <div className="lr-imso-lineups-container">
                            <div className="lrvl-tlt lrvl-tl lrvl-btrc">
                                <div className="lr-vl-hf lrvl-btrc" aria-level="2" role="heading" tabIndex="0">
                                    <img
                                        className="lrvl-nal lrvl-l" id="smlv_JCYsZpGOPIGB9u8P_Nab-AE_1"
                                        src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                        alt="" data-deferred="1" />
                                    <span className="lrvl-tvc lrvl-nal" id="lrvl_ht">Brighton</span>
                                    <span className="lrvl-tvc lrvl-f">4-2-3-1</span>
                                </div>
                                <div className="lr-vl-ls">
                                    <div className="lrvl-fl lr-vl-tgc lr-vl-gc"></div>
                                    <div className="lrvl-fl lrvl-tg lr-vl-gll"></div>
                                    <div className="lrvl-fl lrvl-tg lr-vl-gls"></div>
                                    <div className="lrvl-fl lrvl-mfc lrvl-tmfc"></div><span>
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-4"></div>
                                            {[...teams[0].players].reverse().map((player, index) => (
                                                <>
                                                    <div className="lrvl-fr col-2 mx-1 mx-lg-2 my-2 text-center" style={{ minHeight: '45px ' }} key={index}>
                                                        <span className="lrvl-pd">
                                                            {player.avatar &&
                                                                <div className="container-fluid position-relative">

                                                                    <div className="A9ad7e" style={{ backgroundColor: 'black' }}>
                                                                        <span className="ov5Fzd">{player.playerNumber}</span>
                                                                        <span >{player.firstName}</span>
                                                                    </div>
                                                                    {match?.events?.reverse()?.map((event, i) => {
                                                                        return <>
                                                                            {event.action === "goal" &&
                                                                                event.player._id === player._id &&
                                                                                <FontAwesomeIcon icon={faFutbol} className="position-absolute top-0 end-0  text-white fs-5" />}
                                                                            {event.action === "yellow" &&
                                                                                event.player._id === player._id &&
                                                                                <FontAwesomeIcon icon={faSquare} className="position-absolute top-0 start-0 text-warning fs-5" />}
                                                                            {event.action === "red" &&
                                                                                event.player._id === player._id &&
                                                                                <FontAwesomeIcon icon={faSquare} className="position-absolute top-0 start-0 ms-2  text-danger fs-5" />}
                                                                        </>
                                                                    })}
                                                                </div>
                                                            }
                                                        </span>

                                                    </div>
                                                    {index == 0 && <div className="col-4"></div>}</>
                                            ))}
                                            {match.team1.players.map((player, index) => {
                                                console.log("Détails du joueur :", player);
                                                console.log("Index du joueur :", index);
                                                return null;
                                            })}
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className="lrvl-mfl lrvl-vac"></div>
                            <div className="lrvl-tlt lrvl-tl lrvl-bbrc">
                                <div className="lr-vl-ls">
                                    <div className="lrvl-fl lrvl-mfc lrvl-lmfc"></div>
                                    <div className="lrvl-fl lrvl-lgc lr-vl-gc"></div>
                                    <div className="lrvl-fl lr-vl-lgl lr-vl-gll"></div>
                                    <div className="lrvl-fl lr-vl-lgs lr-vl-gls"></div><span>
                                        <div className="row d-flex justify-content-center">
                                            {teams[1].players.map((player, index) => (
                                                <div className="lrvl-fr col-2  mx-1 mx-lg-2 my-2 text-center" style={{ minHeight: '45px ' }} key={index}>
                                                    <span className="lrvl-pd">
                                                        {player.avatar &&
                                                            <div className="container-fluid position-relative">

                                                                <div className="A9ad7e imso-loa" style={{ backgroundColor: '#0000fd' }}>
                                                                    <span className="ov5Fzd">{player.playerNumber}</span>
                                                                    <span >{player.firstName}</span>
                                                                </div>
                                                                {match?.events?.reverse()?.map((event, i) => {
                                                                        return <>
                                                                            {event.action === "goal" &&
                                                                                event.player._id === player._id &&
                                                                                <FontAwesomeIcon icon={faFutbol} className="position-absolute top-0 end-0  text-white fs-5" />}
                                                                            {event.action === "yellow" &&
                                                                                event.player._id === player._id &&
                                                                                <FontAwesomeIcon icon={faSquare} className="position-absolute top-0 start-0 text-warning fs-5" />}
                                                                            {event.action === "red" &&
                                                                                event.player._id === player._id &&
                                                                                <FontAwesomeIcon icon={faSquare} className="position-absolute top-0 start-0 ms-2  text-danger fs-5" />}
                                                                        </>
                                                                    })}
                                                            </div>
                                                        }
                                                    </span>

                                                </div>
                                            ))}
                                            {match.team2.players.map((player, index) => {
                                                console.log("Détails du joueur :", player);
                                                console.log("Index du joueur :", index);
                                                return null;
                                            })}
                                        </div>
                                    </span>
                                </div>
                                <div className="lr-vl-hf lrvl-bbrc" aria-level="2" role="heading" tabIndex="0"><img
                                    className="lrvl-nal lrvl-l" id="smlv_JCYsZpGOPIGB9u8P_Nab-AE_3"
                                    src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                    alt="" data-deferred="1" /><span className="lrvl-tvc lrvl-nal" id="lrvl_at">Man City</span>
                                    <span className="lrvl-tvc lrvl-f">4-1-4-1</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LineUp;