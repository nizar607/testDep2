import { Component } from 'react';
import bgImage from '../assets/images/bg_3.jpg';
import team1 from '../assets/images/logo_2.png';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import React from 'react';
import ChatBot from 'react-simple-chatbot';
import VoiceDetector from './voicedetecter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faGift, faStar, faGem } from '@fortawesome/free-solid-svg-icons'
import TopPLayers from '../sections/TopPlayers';
import TopTeams from '../sections/TopTeams';


class FetchMatchInfo extends React.Component {
    state = { loading: true, matches: [], error: null, lastMatches: [] };



    componentDidMount() {
        this.fetchMatchData();
    }




    async fetchLastMatches() {
        try {
            const response = await fetch('http://localhost:3001/front/match/lastMatches');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ lastMatches: data, loading: false });
        } catch (error) {
            console.error('Error fetching match data:', error);
            this.setState({ error: error.toString(), loading: false });
        } finally {
            this.props.triggerNextStep();
        }
    }


    async fetchMatchData() {
        try {
            const response = await fetch('http://localhost:3001/match/matches');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ matches: data, loading: false });
        } catch (error) {
            console.error('Error fetching match data:', error);
            this.setState({ error: error.toString(), loading: false });
        } finally {
            this.props.triggerNextStep();
        }
    }

    render() {
        const { loading, matches, error } = this.state;

        if (loading) {
            return <div>Loading matches...</div>;
        }
        if (error) {
            return <div>Error fetching matches: {error}</div>;
        }

        return (
            <div>
                {matches.map((match) => (
                    <div key={match._id}>
                        <div>Team 1: {match.team1Name} - Score: {match.scoreTeam1}</div>
                        <div>Team 2: {match.team2Name} - Score: {match.scoreTeam2}</div>
                        <div>Division: {match.divisionName}</div>
                        <div>Status: {match.matchStatus}</div>
                        <div>Time: {new Date(match.time).toLocaleString()}</div>
                        <hr />
                    </div>
                ))}
            </div>
        );
    }
}



class FetchTournamentInfo extends React.Component {
    state = { loading: true, tournaments: [], error: null };

    componentDidMount() {
        this.fetchTournamentData();
    }

    async fetchTournamentData() {
        try {
            const response = await fetch('http://localhost:3001/tournament/tournamentsAdmin');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ tournaments: data, loading: false });
        } catch (error) {
            console.error('Error fetching tournament data:', error);
            this.setState({ error: error.toString(), loading: false });
        } finally {

            this.props.triggerNextStep();
        }
    }

    render() {
        const { loading, tournaments, error } = this.state;

        if (loading) {
            return <div>Loading tournaments...</div>;
        }
        if (error) {
            return <div>Error fetching tournaments: {error}</div>;
        }

        return (
            <div>
                {tournaments.map((tournament) => (
                    <div key={tournament._id}>
                        Name: {tournament.tournamentName}<br />
                        Start Date: {new Date(tournament.tournamentStartDate).toLocaleDateString()}<br />
                        End Date: {new Date(tournament.tournamentEndDate).toLocaleDateString()}<br />
                        ---------------------
                    </div>
                ))}
            </div>
        );
    }
}


class Home extends Component {

    state = {
        showChatBot: true,
        lastMatches: []
    };

    constructor(props) {
        super(props);
        this.state = {
            countdownTime: null,
            showChatBot: true,
            lastMatches: []
        };
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    componentDidMount() {
        this.fetchNextMatchDate();
        this.fetchLastMatches();

    }


    fetchNextMatchDate = async () => {
        try {
            const response = await fetch('http://localhost:3001/match/nextMatch');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.nextMatchDate = new Date(data.time);
            this.setState({
                countdownTime: this.nextMatchDate - new Date()
            });
            this.intervalId = setInterval(() => {
                this.setState({
                    countdownTime: this.nextMatchDate - new Date()
                });
            }, 1000);
        } catch (error) {
            console.error('Error fetching next match date:', error);
            this.setState({ error: error.toString() });
        }
    }

    checkUserQuery = (userInput) => {
        if (!userInput || !userInput.message) {
            return 'not-understood';
        }

        const query = userInput.message.toLowerCase();
        const tournamentKeywords = ["tournament", "tournaments", "competition", "event"];
        const matchKeywords = ["match", "matches", "game", "games", "fixture", "fixtures"];
        const whoKeywords = ["who", "what's", "you"];

        const isTournamentQuery = tournamentKeywords.some(keyword => query.includes(keyword));
        const isMatchQuery = matchKeywords.some(keyword => query.includes(keyword));
        const isWhoQuery = whoKeywords.some(keyword => query.includes(keyword));

        if (isTournamentQuery) {
            return 'fetch-tournaments';
        } else if (isMatchQuery) {
            return 'fetch-matches';
        }
        else if (isWhoQuery) {
            return 'who';
        }


        else {
            return 'not-understood';
        }
    }

    renderChatBot = () => (
        <div style={{ position: 'fixed', bottom: '0', right: '0', zIndex: 1000 }}>
            <ChatBot
                steps={[
                    { id: '1', message: 'What is your name?', trigger: '2' },
                    { id: '2', user: true, trigger: '3' },
                    { id: '3', message: 'Hi {previousValue}, nice to meet you! How can I assist you today?', trigger: 'user-query' },
                    { id: 'user-query', user: true, trigger: ({ value }) => this.checkUserQuery({ message: value }) },
                    { id: 'fetch-tournaments', component: <FetchTournamentInfo />, asMessage: true, waitAction: true, trigger: 'more-help' },
                    { id: 'fetch-matches', component: <FetchMatchInfo />, asMessage: true, waitAction: true, trigger: 'more-help' },
                    { id: 'who', message: 'We are linkup tournament', trigger: 'more-help' },
                    { id: 'not-understood', message: "I'm sorry, I don't understand. Can you specify if you're asking about matches or tournaments?", trigger: 'user-query' },
                    { id: 'more-help', message: "Can I help with anything else?", trigger: 'user-query-again' },
                    {
                        id: 'user-query-again',
                        options: [
                            { value: 'yes', label: 'Yes', trigger: '3' },
                            { value: 'no', label: 'No, thank you!', end: true },
                        ],
                    },
                ]}
                floating={true}
                headerTitle="Support Chat"
                width="400px"
                height="500px"
                handleClose={this.toggleChatBot}
            />
        </div>
    );



    fetchLastMatches = async () => {
        try {
            const response = await fetch('http://localhost:3001/match/front/getLastMatches');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ lastMatches: data.matches });


        } catch (error) {
            console.error('Error fetching last matches:', error);
        }
    }




    render() {

        const api = import.meta.env.VITE_API_URL;

        const weeks = Math.floor(this.state.countdownTime / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor((this.state.countdownTime % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((this.state.countdownTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((this.state.countdownTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((this.state.countdownTime % (1000 * 60)) / 1000);
        return (
            <>

                <div className="hero overlay" style={{ backgroundImage: `url(${bgImage})` }}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-5 ml-auto">
                                <h1 className="text-white">Get live football updates!</h1>
                                <p>Next match is starting soon make sure to not miss out !</p>
                                <div id="date-countdown">

                                    <span className="countdown-block"><span className="label">{weeks}</span> weeks </span>
                                    <span className="countdown-block"><span className="label">{days}</span> days </span>
                                    <span className="countdown-block"><span className="label">{hours}</span> hr </span>
                                    <span className="countdown-block"><span className="label">{minutes}</span> min </span>
                                    <span className="countdown-block"><span className="label">{seconds}</span> sec</span>
                                </div>
                                <p>

                                    <Link to="/tournaments" className="btn btn-primary py-3 px-4 mr-3">View Tournaments</Link>

                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container">


                    <div id="carouselExampleDark" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                        <div className="carousel-indicators">
                            {this.state.lastMatches.map((match, index) => (
                                <button key={index}
                                    type="button"
                                    data-bs-target="#carouselExampleDark"
                                    data-bs-slide-to={index}
                                    className={index === 0 ? "active" : ""}
                                    aria-current={index === 0 ? "true" : "false"}
                                    aria-label={`Slide ${index + 1}`}>
                                </button>
                            ))}
                        </div>

                        <div className="carousel-inner bg-dark team-vs">
                            {this.state.lastMatches.map((match, index) => (
                                <div key={match._id}
                                    className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                    <div className="row">
                                        <h1 className="col-auto mx-auto fw-normal">LAST 5 GAMES</h1>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="d-flex">
                                            <span className="score">
                                                {match.goals.team1.players.length} - {match.goals.team2.players.length} {/* Assuming each player represents a goal */}
                                            </span>
                                            <div className="team-1 w-50">
                                                <div className="team-details w-100 text-center">
                                                    <img src={`${api}/${match.team1.logo}`} alt="Team 1 Logo" className="img-fluid" />
                                                    <h3>{match.team1.name} <span>({match.winner === match.team1._id ? 'win' : 'loss'})</span></h3>
                                                    <ul className="list-unstyled">
                                                        {match.team1.players.map(player => (
                                                            <li key={player._id}>{player.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="team-2 w-50">
                                                <div className="team-details w-100 text-center">
                                                    <img src={`${api}/${match.team2.logo}`} alt="Team 2 Logo" className="img-fluid" />
                                                    <h3>{match.team2.name} <span>({match.winner === match.team2._id ? 'win' : 'loss'})</span></h3>
                                                    <ul className="list-unstyled">
                                                        {match.team2.players.map(player => (
                                                            <li key={player._id}>{player.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>




                </div>

                <TopPLayers />


                <div className="site-section bg-dark">

                    <div className="container">
                        <div className="row">
                            <div className="col-12 title-section">
                                <h2 className="heading">Top Teams of the month</h2>
                            </div>
                        </div>
                        <TopTeams />
                    </div>
                </div>




                {/** tarification cards  */}
                <div className="site-section bg-light">

                    <div className="container">
                        <div className="row">
                            <div className="col-12 title-section">
                                <h2 className="heading">Tarification</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                                <FontAwesomeIcon icon={faGift} size="3x" />
                                <h3 style={{ textAlign: 'center', color: '#333', marginTop: '20px' }}>World Class</h3>
                                <ul style={{ listStyleType: "none", padding: '0', color: '#666' }}>
                                    <li style={{ marginBottom: '10px' }}><FontAwesomeIcon icon={faCheck} color="green" style={{ marginRight: '10px' }} /> up to 8 teams</li>
                                    <li style={{ marginBottom: '10px' }}><FontAwesomeIcon icon={faCheck} color="green" style={{ marginRight: '10px' }} /> List of sponsors</li>
                                    <li style={{ marginBottom: '10px' }}><FontAwesomeIcon icon={faCheck} color="green" style={{ marginRight: '10px' }} /> Planning tool</li>
                                </ul>
                                <p className="price" style={{ fontWeight: 'bold' }}><span>Free</span></p>
                                <p><a href="#" className="btn btn-primary" style={{ marginTop: 'auto' }}>Get Started</a></p>
                            </div>
                            <div className="col-lg-3 card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                                <FontAwesomeIcon icon={faStar} size="3x" />
                                <h3 style={{ textAlign: 'center', color: '#333', marginTop: '20px' }}>Pro Class</h3>
                                <ul style={{ listStyleType: "none", padding: '0', color: '#666' }}>
                                    <li style={{ marginBottom: '10px' }}><FontAwesomeIcon icon={faCheck} color="green" style={{ marginRight: '10px' }} /> up to 60 teams</li>
                                    <li style={{ marginBottom: '10px' }}><FontAwesomeIcon icon={faCheck} color="green" style={{ marginRight: '10px' }} /> List of sponsors</li>
                                    <li style={{ marginBottom: '10px' }}><FontAwesomeIcon icon={faCheck} color="green" style={{ marginRight: '10px' }} /> advanced Planning tool</li>
                                </ul>
                                <p className="price" style={{ fontWeight: 'bold' }}><span>40 DT</span> / tournament</p>
                                <p><a href="#" className="btn btn-primary" style={{ marginTop: 'auto' }}>Get Started</a></p>
                            </div>
                            <div className="col-lg-3 card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                                <FontAwesomeIcon icon={faGem} size="3x" />
                                <h3 style={{ textAlign: 'center', color: '#333', marginTop: '20px' }}>Legendary Class</h3>
                                <ul style={{ listStyleType: "none", padding: '0', color: '#666' }}>
                                    <li style={{ marginBottom: '10px' }}><FontAwesomeIcon icon={faCheck} color="green" style={{ marginRight: '10px' }} /> unlimited number of teams</li>
                                    <li style={{ marginBottom: '10px' }}><FontAwesomeIcon icon={faCheck} color="green" style={{ marginRight: '10px' }} /> List of sponsors</li>
                                    <li style={{ marginBottom: '10px' }}><FontAwesomeIcon icon={faCheck} color="green" style={{ marginRight: '10px' }} /> advanced Planning tool</li>
                                    <li style={{ marginBottom: '10px' }}><FontAwesomeIcon icon={faCheck} color="green" style={{ marginRight: '10px' }} /> advanced features based on AI</li>
                                </ul>
                                <p className="price" style={{ fontWeight: 'bold' }}><span>120 DT</span> / tournament</p>
                                <p><a href="#" className="btn btn-primary" style={{ marginTop: 'auto' }}>Get Started</a></p>
                            </div>
                        </div>
                    </div>
                </div>



                {this.state.showChatBot ? this.renderChatBot() : this.renderChatBotButton()}
                <VoiceDetector />





            </>
        );
    }
}

export default Home;