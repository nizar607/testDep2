import React, { useState, useRef } from 'react';
import io from 'socket.io-client';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import team1 from '../assets/images/logo_2.png';





const LiveMatches = () => {
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState({ _id: '', animate: false });
    const [tournament, setTournament] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState(null);
    const socket = io('http://localhost:3002');
    const matchesRef = useRef(matches);

    const handleTournamentClick = (tournamentId) => {
        setSelectedTournament(tournamentId);
    };

    // test push branch
    /*
    const filteredMatches = selectedTournament
        ? matches.filter(match => match.tournamentId === selectedTournament)
        : matches; */

    const api = import.meta.env.VITE_API_URL;


    // Update the ref every time matches changes
    useEffect(() => {
        matchesRef.current = matches;
    }, [matches]);


    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await axios.get(`${api}/tournament/frontoffice/all`);
                setTournament(response.data.tournaments);
                console.log('Tournaments:', response.data);
            } catch (error) {
                console.error('Error fetching tournaments:', error);
            }
        };

        fetchTournaments();

        const fetchMatches = async () => {
            try {
                const response = await axios.get(`${api}/match/get-matches`);
                setMatches(response.data);
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };

        fetchMatches();

        socket.on('matchScoreUpdated', (data) => {
            console.log(`Received match: `, data);
            if (data.events[data.events.length - 1].action === "goal") {
                toast.success(`🎉 Goal: ${data.team1.name} ${data.goals.team1.players.length} - ${data.goals.team2.players.length}  ${data.team2.name}🚀`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                playGoalMessage();
                const copyMatches = [...matchesRef.current];
                console.log('Updated matches:', copyMatches);
                const index = copyMatches.findIndex(match => match._id === data._id);
                copyMatches[index] = data;
                setSelectedMatch({ _id: data._id, animate: true });

                setInterval(() => {
                    setSelectedMatch((prev) => {
                        console.log('Previous selected match:', prev);
                        return { _id: '', animate: false }
                    });
                }, 1000);

                console.log('Updated matches:', copyMatches);
                setMatches(copyMatches);
            }
        });

        return () => {
            socket.off('matchScoreUpdated');
        };
    }, []); // Remove matches from the dependencies

    useEffect(() => {
        if (selectedTournament) {
            console.log('Selected tournament:', selectedTournament)
            const fetchMatches = async () => {
                try {
                    const response = await axios.get(`${api}/match/front/matchesbytournament/${selectedTournament}`);
                    console.log('slected tournament Matches:', response.data);
                    setMatches(response.data);
                } catch (error) {
                    console.error('Error fetching matches:', error);
                }
            };

            fetchMatches();
        }
    }, [selectedTournament]);


    const playGoalMessage = () => {
        if ('speechSynthesis' in window) {
            var msg = new SpeechSynthesisUtterance('Goal is scored');
            window.speechSynthesis.speak(msg);
        } else {
            console.log('Your browser does not support speech synthesis.');
        }
    };









    return (
        <>
            <ToastContainer />
            <br /> <br /> <br />  <br /> <br /> <br />
            <div className="container" style={{ maxWidth: '1200px', margin: 'auto', display: 'flex' }}>
                <div style={{ flex: '0 0 20%', marginRight: '20px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Filter</h2>
                    <ul className="list-group">
                        {tournament && tournament.map((tournament, index) => {
                            return (
                                <li key={index} className="list-group-item" style={{ display: 'flex', alignItems: 'center', width: '300px', height: '70px', fontWeight: 'bold', borderLeft: '7px solid red', marginBottom: '5px', color: selectedTournament === tournament._id ? 'red' : 'black' }} onClick={() => { handleTournamentClick(tournament._id); setSelectedTournament(tournament._id); }}>
                                    <img src={`${api}/${tournament?.tournamentLogo}`} alt="team 1 logo" style={{ width: "60px", height: "60px", marginRight: '10px', borderRadius: '50%' }} />
                                    {tournament?.tournamentName}
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div style={{ flex: '1 1 auto' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Live Matches</h2>
                    <div className="row g-4 match-grid GameListStyleTwo">
                        {matches.filter(match => match.team1 && match.team2 && match.status == "En cours").map((match) => {
                            return (
                                <div className="col-lg-12" key={match._id}>
                                    <div className="widget-next-match">
                                        <div className="widget-title d-flex align-items-center">
                                            <img src="/src/assets/images/division.png" style={{ width: '30px', height: '30px', marginRight: '10px' }} alt="" />
                                            <h3>Division {match.division?.name}</h3>
                                        </div>
                                        <div className="widget-body mb-3">
                                            <div className="widget-vs">
                                                <div className="row align-items-center justify-content-between w-100">
                                                    <div className="col-5 text-center " >
                                                        <img src={`${api}/${match.team1?.logo}`} style={{ width: '100px', height: '100px' }} alt="team 1 logo" />
                                                        <h3 style={{ height: '1.5em', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '10px' }}>{match.team1?.name}</h3>
                                                    </div>
                                                    <div className="col-2">
                                                        <span className="vs" style={{ marginLeft: '20px', marginTop: '50px' }}><span>VS</span></span>
                                                        <p className="fw-bold" style={{ marginLeft: '30px', marginTop: '10px' }} >{match?.goals?.team1?.players.length} - {match?.goals?.team2?.players.length}</p>
                                                    </div>
                                                    <div className="col-5 text-center">
                                                        <img src={`${api}/${match.team2?.logo}`} style={{ width: '100px', height: '100px' }} alt="team 2 logo" />
                                                        <h3 style={{ height: '1.5em', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '10px' }}>{match.team2?.name}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            );
                        })}
                    </div>
                </div>
            </div>
            <br /><br /><br />
        </>
    );
}
export default LiveMatches;

//hedhi