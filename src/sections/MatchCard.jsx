import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbolBall, faScaleBalanced, faSquare, faExternalLinkAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const MatchCard = ({ matches }) => {

    const ApiUrl = "http://localhost:3001";
    console.log("from matchCard", matches);

    return (
        <div>
            <div className="row g-5">

                <div className="site-section bg-dark">
                    <div className="container">



                        <div className="row">
                            <div className="col-12 title-section">
                                <h2 className="heading">Played Matchs</h2>
                            </div>
                            {matches.filter(match => match.status === 'Terminé' && match.team1?.name && match.team2?.name).map((match, i) => (
                                <div className="col-lg-6 mb-4">

                                    <div className="bg-light rounded">


                                        <div className="container-fluid pb-4">

                                            <div className="widget-vs">

                                                <div className="row bg-primary mb-3 py-2">
                                                    <h4 className="col-10 font-weight-bold">
                                                        Round {match.round}
                                                    </h4>
                                                    <div className="col-2 d-flex justify-content-end align-items-center">
                                                        <Link to={`/match/${match._id}`} style={{ color: 'white', fontWeight: '900' }}>
                                                            <FontAwesomeIcon icon={faArrowRight} />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column w-100 ">
                                                    <div className="d-flex align-items-center mb-2">
                                                        <div style={{ width: '60px' }}>
                                                            <Link to="/team-single">
                                                                <img className="img-fluid rounded-circle" src={`${ApiUrl}/${match.team2?.logo}`} alt="Image" style={{ maxHeight: '50px', width: 'auto' }} />
                                                            </Link>
                                                        </div>
                                                        <div className="d-flex justify-content-between w-100 ms-2">
                                                            <p className="text-white" style={{ fontWeight: 'bold', color: 'black' }}>{match.team2?.name}</p>
                                                            <div className="d-flex align-items-center">
                                                                <p className="text-white me-2" style={{ fontWeight: 'bold', color: 'black', borderRight: '1px solid white', paddingRight: '10px' }}>
                                                                    {match.goals.team2.players.length > match.goals.team1.players.length && <span style={{ color: 'green', marginRight: '5px', fontSize: '1.5em' }}>&#8593;</span>}
                                                                    {match.goals.team2.players.length}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex align-items-center">
                                                        <div style={{ width: '60px' }}>
                                                            <Link to="/team-single">
                                                                <img className="img-fluid rounded-circle" src={`${ApiUrl}/${match.team1?.logo}`} alt="Image" style={{ maxHeight: '50px', width: 'auto' }} />
                                                            </Link>
                                                        </div>
                                                        <div className="d-flex justify-content-between w-100 ms-2">
                                                            <p className="text-white" style={{ fontWeight: 'bold', color: 'black' }}>{match.team1?.name}</p>
                                                            <div className="d-flex align-items-center">
                                                                <p className="text-white me-2" style={{ fontWeight: 'bold', color: 'black', borderRight: '1px solid white', paddingRight: '10px' }}>
                                                                    {match.goals.team1.players.length > match.goals.team2.players.length && <span style={{ color: 'green', marginRight: '5px', fontSize: '1.5em' }}>&#8593;</span>}
                                                                    {match.goals.team1.players.length}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-center mt-2" style={{ backgroundColor: '#333', padding: '10px', borderRadius: '5px' }}>
                                                        <div>
                                                            <p className="text-white" style={{ fontWeight: 'bold', color: 'white' }}>Status  {match.status}</p>
                                                            <span className="text-white d-block">
                                                                <b className="text-primary">Date: </b>
                                                                {new Date(match.time).toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: '2-digit' })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>




                                        </div>



                                    </div>
                                </div>
                            ))}
                        </div>



                        <div className="row">
                            <div className="col-12 title-section">
                                <h2 className="heading">Upcoming Matchs</h2>
                            </div>
                            {matches.filter(match => match.status === 'Non joué' && match.team1?.name && match.team2?.name).map((match, i) => (
                                <div className="col-lg-6 mb-4">

                                    <div className="bg-light rounded">


                                        <div className="container-fluid pb-4">

                                            <div className="widget-vs">

                                                <div className="row bg-primary mb-3 py-2">
                                                    <h4 className="col-10 font-weight-bold">
                                                        Round {match.round}
                                                    </h4>
                                                    <div className="col-2 d-flex justify-content-end align-items-center">
                                                        <Link to={`/match/${match._id}`} style={{ color: 'white', fontWeight: '900' }}>
                                                            &#8594;
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column w-100 ">
                                                    <div className="d-flex align-items-center mb-2">
                                                        <div style={{ width: '60px' }}>
                                                            <Link to="/team-single">
                                                                <img className="img-fluid rounded-circle" src={`${ApiUrl}/${match.team2?.logo}`} alt="Image" style={{ maxHeight: '50px', width: 'auto' }} />
                                                            </Link>
                                                        </div>
                                                        <div className="d-flex justify-content-between w-100 ms-2">
                                                            <p className="text-white" style={{ fontWeight: 'bold', color: 'black' }}>{match.team2?.name}</p>
                                                            <div className="d-flex align-items-center">
                                                                <p className="text-white me-2" style={{ fontWeight: 'bold', color: 'black', borderRight: '1px solid white', paddingRight: '10px' }}>
                                                                    {match.goals.team2.players.length > match.goals.team1.players.length && <span style={{ color: 'green', marginRight: '5px', fontSize: '1.5em' }}>&#8593;</span>}
                                                                    {match.goals.team2.players.length}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex align-items-center">
                                                        <div style={{ width: '60px' }}>
                                                            <Link to="/team-single">
                                                                <img className="img-fluid rounded-circle" src={`${ApiUrl}/${match.team1?.logo}`} alt="Image" style={{ maxHeight: '50px', width: 'auto' }} />
                                                            </Link>
                                                        </div>
                                                        <div className="d-flex justify-content-between w-100 ms-2">
                                                            <p className="text-white" style={{ fontWeight: 'bold', color: 'black' }}>{match.team1?.name}</p>
                                                            <div className="d-flex align-items-center">
                                                                <p className="text-white me-2" style={{ fontWeight: 'bold', color: 'black', borderRight: '1px solid white', paddingRight: '10px' }}>
                                                                    {match.goals.team1.players.length > match.goals.team2.players.length && <span style={{ color: 'green', marginRight: '5px', fontSize: '1.5em' }}>&#8593;</span>}
                                                                    {match.goals.team1.players.length}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-center mt-2" style={{ backgroundColor: '#333', padding: '10px', borderRadius: '5px' }}>
                                                        <div>
                                                            <p className="text-white" style={{ fontWeight: 'bold', color: 'white' }}>Status  {match.status}</p>
                                                            <span className="text-white d-block">
                                                                <b className="text-primary">Date: </b>
                                                                {new Date(match.time).toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: '2-digit' })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>




                                        </div>



                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>

            </div>


        </div>
    );
};
export default MatchCard;