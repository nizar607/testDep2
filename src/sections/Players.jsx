import { useEffect } from "react";
import { useState } from "react";
import { getDivision } from "../services/DivisionsService";

function Players({ division }) {

    const apiUrl = import.meta.env.VITE_API_URL;



    useEffect(() => {
        console.log('Division:', division);
    }, [division]);
    return (
        <>gg</>
        /*
        <div className="hero">
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
                                                    <img src={`${apiUrl}/${player.avatar}`}
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

        */
    )
}

export default Players;