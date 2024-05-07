import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';



const TeamDetail = () => {
    const { teamId } = useParams();
    const api = import.meta.env.VITE_API_URL;
    console.log(teamId);
    const [team, setTeam] = useState(null);
    const [isHovered, setIsHovered] = useState({});

    useEffect(() => {
        axios.get(`${api}/team/team-stats/${teamId}`)
            .then((response) => {
                console.log("Team fetched successfully", response.data);
                setTeam(response.data);

            })
            .catch((error) => {
                console.error("Error fetching team or player stats:", error);
            });
    }, [teamId]);

    if (!team) {
        return 'Loading...';
    }




    // Inside your component
    return (
        <>
            <br /><br /><br /><br /><br />


            <div style={{
                backgroundSize: 'cover',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: '150px',
                marginRight: '150px',
                padding: '0 50px',
                borderRadius: '20px', /* Adds rounded corners */
                background: 'linear-gradient(to right, #f0f0f0, #ffffff)', /* Light grey to white gradient */
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' /* Adds shadow for depth */
            }}>
                <img
                    src={`${api}/${team.team.logo}`}
                    alt={team.name}
                    style={{
                        width: '200px',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '100px', /* Makes the image round */
                        border: '5px solid white', /* Adds a white border */
                        marginLeft: '20%'
                    }}
                />
                <div style={{ marginRight: '20%' }}>
                    <h1 style={{
                        color: 'black', /* Changed to black for contrast against lighter background */
                        fontSize: '48px',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)' /* Adds shadow to text for better readability */
                    }}>{team.team.name}</h1>
                    <h3 style={{
                        color: '#333333', /* Dark grey for contrast and subtlety */
                        fontSize: '32px',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)' /* Adds shadow to text for better readability */
                    }}>{team.team.location}</h3>
                </div>
            </div>










            <br /><br />

            <div className=" padding-top padding-bottom">
                <div className="container">
                    <div className="row justify-content-center pb-15">
                        <div className="col-md-12">
                            <article>
                                <div className="shop-product-wrap grid row justify-content-center g-4">
                                    {team.team.players.map((player, i) => (
                                        <div className="col-lg-4 col-md-6 col-12" key={i}>
                                            <div className="product-item" style={{
                                                border: '2px solid #ddd',
                                                borderRadius: '4px',
                                                padding: '10px',
                                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
                                                position: 'relative'
                                            }}>
                                                <div
                                                    className="product-thumb"
                                                    onMouseEnter={() => setIsHovered(prevState => ({ ...prevState, [i]: true }))}
                                                    onMouseLeave={() => setIsHovered(prevState => ({ ...prevState, [i]: false }))}
                                                >
                                                    <div className="pro-thumb">
                                                        <img src={`${api}/${player.avatar}`}
                                                            style={{
                                                                width: '100%',
                                                                height: '500px',
                                                                objectFit: 'cover',
                                                                filter: isHovered[i] ? 'blur(2px)' : 'none'
                                                            }} alt={`${player.firstName} ${player.lastName}`} />
                                                    </div>
                                                    <div className="product-action-link" style={{
                                                        display: isHovered[i] ? 'block' : 'none',
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                        color: 'white',
                                                        textAlign: 'center',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                        padding: '20px', // Add padding
                                                        borderRadius: '10px' // Add border radius
                                                    }}>
                                                        <div>
                                                            <h3 style={{ marginBottom: '10px', fontWeight: 'bold', color: '#FFD700' }}>Height  <span style={{ color: 'white', fontWeight: 'normal' }}>{player.height} (CM)</span></h3> <br />
                                                            <h3 style={{ marginBottom: '10px', fontWeight: 'bold', color: '#FFD700' }}>Position  <span style={{ color: 'white', fontWeight: 'normal' }}>{player.position}</span></h3> <br />
                                                            <h3 style={{ marginBottom: '10px', fontWeight: 'bold', color: '#FFD700' }}>Player Number  <span style={{ color: 'white', fontWeight: 'normal' }}>{player.playerNumber}</span></h3>
                                                        </div>
                                                        <a href="#"><i className="icofont-eye"></i></a>
                                                    </div>
                                                </div>
                                                <div className="product-content" style={{ textAlign: 'center', padding: '10px 0' }}>
                                                    <h5 style={{
                                                        fontWeight: 'bold',
                                                        color: '#FFD700',
                                                        textTransform: 'uppercase',
                                                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                                                    }}>
                                                        {player.firstName} {player.lastName}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginLeft: '100px', marginRight: '100px', marginTop: '100px' }}>
                <table className="table" >
                    <thead className="thead-dark">
                        <tr>
                            <th>Player</th>
                            <th>Matches Played</th>
                            <th>Goals Scored</th>
                            <th>Yellow Cards</th>
                            <th>Red Cards</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.playerStats.map((playerStat, index) => (
                            <tr key={index}>
                                <td style={{ color: 'white', fontWeight: 'bold' }}>
                                    <img
                                        src={`${api}/${playerStat.player.avatar}`}
                                        alt={`${playerStat.player.firstName} ${playerStat.player.lastName}`}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                                    />
                                    {playerStat.player.firstName} {playerStat.player.lastName}
                                </td>
                                <td style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{playerStat.matchesPlayed}</td>
                                <td style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{playerStat.goalsScored}</td>
                                <td style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{playerStat.yellowCards}</td>
                                <td style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{playerStat.redCards}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
};
export default TeamDetail;