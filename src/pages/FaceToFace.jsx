import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbolBall, faScaleBalanced, faSquare } from '@fortawesome/free-solid-svg-icons'
import { getMatch } from "../services/MatchService";
import io from 'socket.io-client';
import './styles.css';

const FaceToFace = () => {
    const { matchId } = useParams();
    const [showVideo, setShowVideo] = useState(false);
    const videoRef = useRef();

    console.log("Match ID: ", matchId);
    const [loading, setLoading] = useState(true); // Add this line
    const [socket, setSocket] = useState(null);
    //getting the match by id in a useeffect
    const [match, setMatch] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchMatch = async () => {
        if (matchId) {
            const response = await getMatch(matchId);
            console.log("response", response.data);
            if (response.data) {
                setLoading(false);
            }
            setMatch(response.data);
        }
    }
    const resetMatch = async (response) => {
        if (matchId) {

            console.log("response", response);
            if (response) {
                setLoading(false);
            }
            setMatch(response);
        }
    }

    useEffect(() => {
        fetchMatch();
    }, [matchId]);

    useEffect(() => {

        const socketInstance = io('http://localhost:3002');
        setSocket(socketInstance);



        socketInstance.on('matchScoreUpdated', (data) => {
            console.log(`Received match: `, data);
            if (data.events[data.events.length - 1].action === "goal") {
                setShowVideo(true);
                videoRef?.current?.play();
                setTimeout(() => setShowVideo(false), 4500);
            }
            resetMatch(data);
            setMatch(data);
        });




        return () => {
            if (socketInstance) {
                socketInstance.disconnect();
            }
        };
    }, []);
    if (loading) { // Add this block
        return <div>Loading...</div>;
    }



    return (

        <div className="latest-news">

            <button onClick={() => setShowVideo(true)}>show red card</button>


            <img
                height={100}
                className={`img-fluid h-100 w-50 pop-animation`}
                src={`/assets/images/goal.gif`}
                alt="Player"
            />

            <img
                height={100}
                className="img-fluid h-100 w-50"
                src={`/assets/images/red-card.gif`}
                alt="Player" />
            <img
                height={100}
                className="img-fluid h-100 w-50"
                src={`/assets/images/yellow-card.gif`}
                alt="Player" />



            <div className="container">
                <div className="row">
                    {showVideo ? (
                        <video
                            ref={videoRef}
                            className={!showVideo ? 'video-fade-out' : ''}
                            style={{ width: '100%' }}
                            src="/assets/videos/goalShotVideo.mp4"
                            autoPlay muted></video>
                    ) : (
                        <section className="banner-section">
                            <div className="container m-3 py-5 border rounded-pill bg-light">
                                <div className="banner-content text-center">
                                    <div className="banner-thumb d-flex flex-wrap justify-content-between align-items-center align-items-lg-end">
                                        <div className="container">
                                            <div className="row d-flex justify-content-around align-items-center">
                                                <Link className="col-auto" to="/team-single">
                                                    <img style={{ height: '150px' }} src={`${apiUrl}/${match.team1?.logo}`} alt="banner-thumb" />
                                                </Link>
                                                <div className="col-5">
                                                    <div className="scoreboard bg-primary" style={{ width: '100%', color: '#fff', padding: '10px', borderRadius: '5px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '20px' }}>
                                                        <div className="row w-100">
                                                            <span className="score  " style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>{match.goals.team1.players.length}</span>
                                                        </div>

                                                        <div className="vs" style={{ borderTop: '2px solid white', width: '50%', margin: '20px 0' }}></div>

                                                        <div className="row justify-content-around w-100">
                                                            <span className="col-auto" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>{match.goals.team2.players.length}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link className="col-auto" to="/team-single">
                                                    <img style={{ height: '150px' }} src={`${apiUrl}/${match.team2?.logo}`} alt="banner-thumb" />
                                                </Link>
                                            </div>

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </section>
                    )}



                    <br /><br />


                    <div className="container achievement-section mt-10 padding-bottom p-5" style={{ transform: "scale(0.9)" }}>
                        <div className="achievement-area">

                            <div className="row d-flex justify-content-between align-items-center">

                                <div className="col-4 bg-danger px-5 py-3">
                                    <div className="row d-flex justify-content-between">

                                        <h4 className="col-auto">
                                            TEAM:
                                        </h4>
                                        <h4 className="col-auto">
                                            {match.team1.name}
                                        </h4>
                                    </div>
                                </div>

                                <div className="col-4 text-center bg-white">
                                    <h4 className="text-dark">
                                        Match Details
                                    </h4>
                                </div>

                                <div className="col-4 bg-danger px-5 py-3">
                                    <div className="row d-flex justify-content-between">

                                        <h4 className="col-auto">
                                            TEAM:
                                        </h4>
                                        <h4 className="col-auto">
                                            {match.team2.name}
                                        </h4>
                                    </div>
                                </div>

                            </div>

                            {[...match.events].reverse().map((event, i) => {

                                return <>
                                    < div className="row mt-3">
                                        {match.team1.players.find(player => player._id === event.player._id) ? (
                                            < div className="col-4">
                                                <div className="row">

                                                    <div key={i} className="col-12">
                                                        <div className="row align-items-center m-2 border rounded">
                                                            <div className="col-6">
                                                                <img
                                                                    height={100}
                                                                    className="img-fluid border rounded"
                                                                    src={`${apiUrl}/${event.player.avatar}`}
                                                                    alt="Player" />

                                                            </div>
                                                            <div className="col-6">
                                                                <h4>{event.player.firstName}</h4>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        ) :
                                            <div className="col-4">
                                                <div className="row">

                                                    <div className="col-12" style={{
                                                        height: "140px",
                                                    }}>
                                                        <div className="row align-items-center m-2">
                                                            <div className="col-6">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}

                                        <div className="col-4 bg-white rounded ">

                                            <div
                                                style={{
                                                    height: "140px",
                                                }}
                                                className="row m-2 align-items-center text-center"
                                            >
                                                <h4 className="text-dark">
                                                    {event.action === "goal" && <FontAwesomeIcon className="mx-2" icon={faFutbolBall} />}
                                                    {event.action === "red" && <FontAwesomeIcon className="mx-2 text-danger" icon={faSquare} />}
                                                    {event.action === "yellow" && <FontAwesomeIcon className="mx-2 text-warning" icon={faSquare} />}
                                                    {event.action}
                                                </h4>

                                            </div>
                                        </div>

                                        {match.team2.players.find(player => player._id === event.player._id) ? (

                                            <div className="col-4">
                                                <div className="row ">

                                                    <div key={i} className="col-12 ">
                                                        <div className="row align-items-center m-2 border rounded">
                                                            <div className="col-6">
                                                                <h4>{event.player.firstName}</h4>
                                                            </div>
                                                            <div className="col-6">
                                                                <img
                                                                    height={100}
                                                                    className="img-fluid border rounded"
                                                                    src={`${apiUrl}/${event.player.avatar}`}
                                                                    alt="Player" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        ) :
                                            <div className="col-4">
                                                <div className="row">

                                                    <div className="col-12" style={{
                                                        height: "140px",
                                                    }}>
                                                        <div className="row align-items-center m-2  ">
                                                            <div className="col-6">
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        }
                                    </div>
                                </>

                            })}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaceToFace;