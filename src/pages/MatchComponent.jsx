import React, { useEffect, useState } from 'react';
import './MatchComponentStyle.css';



import LineUp from '../sections/LineUp';
import TimeLine from '../sections/TimeLine';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getMatch } from '../services/MatchService';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import MatchStats from '../sections/MatchStats';



function MatchComponent() {

    const [match, setMatch] = useState({});
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    const params = useParams();
    const [link, setLink] = useState("TIMELINE");
    const apiUrl = import.meta.env.VITE_API_URL;


    const fetchMatch = async () => {
        if (params.matchId) {
            const response = await getMatch(params.matchId);
            console.log("response", response.data);
            if (response.data) {
                setLoading(false);
            }
            setMatch(response.data);
        }
    }
    useEffect(() => {
        fetchMatch();

        const socketInstance = io('http://localhost:3002');

        setSocket(socketInstance);



        socketInstance.on('matchScoreUpdated', (data) => {
            console.log(`Received match: `, data);
            setMatch(data);
        });




        return () => {
            if (socketInstance) {
                socketInstance.disconnect();
            }
        };

    }, []);

    if (!match) return <h1>loading ...</h1>;

    return (
        <div className="latest-news">
            <div className="container-fluid">

                <div className="row">


                    <div>
                        <div>
                            <div className="row align-items-center text-white mb-3" style={{ background: "#212121", minHeight: "60px" }}>

                                <div className="col-auto">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </div>

                                <div className="col-auto" role="heading">
                                    {match?.team1?.name} VS {match?.team2?.name}
                                </div>

                            </div>


                            <div className="match-feed bg-dark" >


                                <div className="imso_mh__mh-ed my-3">
                                    <div className="imso_mh__tm-scr imso_mh__mh-bd imso_mh__nma">

                                        <div className="imso_mh__stts-l imso-ani imso_mh__stts-l-cont">
                                            <div className="imso_mh__pst-m-stts-l">
                                                <span
                                                    className="imso_mh__ft-mtch imso-medium-font imso_mh__ft-mtchc">Full-time</span>
                                                <div className="imso-hide-overflow">
                                                    <span><span>
                                                        <span className="imso-loa imso-ln" style={{ color: "#3F1052" }}>
                                                            Premier League
                                                        </span>
                                                    </span>
                                                        <span className="imso_mh__bull"> · </span>
                                                    </span>
                                                    <span>Yesterday</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="imso_mh__tm-a-sts">
                                            <div className="imso-ani imso_mh__tas">
                                                <div className="imso_mh__ts-nee">
                                                    <div
                                                        className="imso_mh__first-tn-ed imso_mh__tnal-cont imso-loa imso-ut imso-tnol">
                                                        <div className="imso_mh__t-l-cont" style={{ height: "48px" }}>
                                                            <img
                                                                className="imso_btl__mh-logo" alt="" height="48px"
                                                                id="spotl_JCYsZrWXGvyo9u8P78m1sAk_1"
                                                                src={`${apiUrl}/${match?.team1?.logo}`}
                                                                width="48px" />
                                                        </div>
                                                        <div className="imso_mh__tm-nm imso-medium-font imso_mh__tm-nm-ew">
                                                            <div className="ellipsisize liveresults-sports-immersive__team-name-width">
                                                                <span>{match?.team1?.name}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="imso_mh__scr-sep">
                                                        <div>
                                                            <div className="imso_mh__ma-sc-cont">
                                                                <div className="imso_mh__l-tm-sc imso_mh__scr-it imso-light-font">
                                                                    {match?.goals?.team1?.players?.length}
                                                                </div>
                                                                <div
                                                                    className="imso_mh__scr-it imso_mh__sep imso-light-font">
                                                                    -</div>
                                                                <div className="imso_mh__r-tm-sc imso_mh__scr-it imso-light-font">
                                                                    {match?.goals?.team2?.players?.length}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="imso_mh__second-tn-ed imso_mh__tnal-cont imso-loa imso-ut imso-tnol">
                                                        <div className="imso_mh__t-l-cont" style={{ height: "48px" }}>
                                                            <img
                                                                className="imso_btl__mh-logo" alt="" height="48px"
                                                                id="spotl_JCYsZrWXGvyo9u8P78m1sAk_3"
                                                                src={`${apiUrl}/${match?.team2?.logo}`}
                                                                width="48px" /></div>
                                                        <div className="imso_mh__tm-nm imso-medium-font imso_mh__tm-nm-ew">
                                                            <div
                                                                className="ellipsisize liveresults-sports-immersive__team-name-width">
                                                                <div className="liveresults-sports-immersive__hide-element">Man City</div>
                                                                <span>{match?.team2?.name}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="text-white costum-secondary">
                                    <ol className="row d-flex justify-content-between costum_links">
                                        <li onClick={() => setLink("TIMELINE")} className={`costum_link col-4 ${link == "TIMELINE" ? "active-link" : ""}`}>TIMELINE</li>
                                        <li onClick={() => setLink("LINEUP")} className={`costum_link col-4 ${link == "LINEUP" ? "active-link" : ""}`}>LINEUP</li>
                                        <li onClick={() => setLink("STATS")} className={`costum_link col-4 ${link == "STATS" ? "active-link" : ""}`}>STATS</li>
                                    </ol>
                                </div>

                                {link === "TIMELINE" &&
                                    <>
                                        <TimeLine match={match} />
                                    </>
                                }

                                {link === "LINEUP" &&
                                    <>
                                        <LineUp match={match} />
                                    </>
                                }

                                {link === "STATS" &&
                                    <>
                                        <MatchStats match={match}/>
                                    </>
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default MatchComponent;