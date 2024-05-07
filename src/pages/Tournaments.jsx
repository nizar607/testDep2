import { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import "./styles.css";

import axios from 'axios';


const title = "Our Football Tournaments";
const subtitle = "today's";
const btnText = "Browse All games";

function Tournaments() {
    const [tournaments, setTournaments] = useState([]);
    const [filteredTournaments, setFilteredTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchCriteria, setSearchCriteria] = useState("");

    useEffect(() => {
        fetchTournaments();
    }, []);

    useEffect(() => {
        applySearchAndFilter();
    }, [tournaments, searchCriteria]);


    const fetchTournaments = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;

            const response = await axios.get(`${apiUrl}/tournament/frontoffice/all`);
            console.log("Tournaments: ", response.data);
            setTournaments(response.data.tournaments);
            setFilteredTournaments(response.data.tournaments);
            console.log("Tournaments: ", `${apiUrl}/tournament/frontoffice/all`);
            setLoading(false);

        } catch (error) {
            console.error("There was an error fetching the tournaments: ", error);
        }
    };


    const filterItem = (tournamentLevel) => {
        if (tournamentLevel === 'all') {
            setFilteredTournaments(tournaments); // Show all tournaments
        } else {
            const updatedItems = tournaments.filter(tournament => tournament.tournamentLevel.toLowerCase() === tournamentLevel);
            setFilteredTournaments(updatedItems);
        }
    };



    const handleSearchChange = (e) => {

        console.log("setSearchCriteria: ", e.target.value);
        setSearchCriteria(e.target.value);

    };


    const applySearchAndFilter = () => {
        let updatedTournaments = tournaments;

        if (searchCriteria) {
            updatedTournaments = updatedTournaments.filter(tournament =>
                tournament.tournamentName.toLowerCase().includes(searchCriteria.toLowerCase())
            );
        }

        setFilteredTournaments(updatedTournaments);
    };



    return (
        <>
            {
                loading ? (

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <div style={{ border: '16px solid #f3f3f3', borderRadius: '50%', borderTop: '16px solid #3498db', width: '120px', height: '120px', animation: 'spin 2s linear infinite' }}></div>
                    </div>
                ) : (
                    // <section className="hero collection-section padding-top padding-bottom d-flex align-items-center">
                    //     <div className="container">
                    //         <div className="section-header">
                    //             <p>{subtitle}</p>
                    //             <h2>{title}</h2>
                    //         </div>
                    //         <div className="section-wrapper">
                    //             <div className="row g-4 justify-content-center CollectionStyle">
                    //                 {tournaments?.map((tournament, i) => (
                    //                     <div className="col-lg-4 col-sm-6 col-12" key={i}>
                    //                         <div className="game-item item-layer">
                    //                             <div className="game-item-inner">
                    //                                 <div className="game-thumb">
                    //                                     <ul className="match-team-list d-flex flex-wrap align-items-center justify-content-center">
                    //                                         <Link to={`/team-single/${tournament._id}`}>
                    //                                             <li className="match-team-thumb">

                    //                                                 <img
                    //                                                     src={`http://localhost:3001/${tournament.tournamentLogo}`}
                    //                                                     alt={tournament.tournamentName}
                    //                                                     style={{ width: '200px', height: '200px' }} // specify the width and height
                    //                                                 />


                    //                                             </li>
                    //                                         </Link>


                    //                                     </ul>
                    //                                 </div>
                    //                                 <Link to={`/team-single/${tournament._id}`}>
                    //                                     <div className="game-overlay">
                    //                                         <h4>{tournament.tournamentName} <br /> <br /> Level : {tournament.tournamentLevel} </h4>
                    //                                     </div>
                    //                                 </Link>
                    //                             </div>
                    //                         </div>
                    //                     </div>
                    //                 ))}
                    //             </div>
                    //             <div className="button-wrapper text-center mt-5">

                    //                 <Link to="/game-list" className="default-button"><span>{btnText} <i className="icofont-circled-right"></i></span> </Link>

                    //             </div>
                    //         </div>
                    //     </div>
                    // </section>

                    <div className="site-wrap">



                        <div className="container site-section">
                            <div className="row">
                                <div className="col-6 title-section mt-5">
                                    <h2 className="heading">Our Tournaments</h2>
                                </div>
                            </div>

                            <Breadcrumbs aria-label="breadcrumb" className="d-flex flex-wrap justify-content-center text-uppercase text-primary mb-3">
                                <Link
                                    className="text-white"
                                    underline="hover"
                                    color="inherit"
                                    onClick={() => filterItem('all')}>
                                    All matches
                                </Link>
                                <Link
                                    className="text-white"
                                    underline="hover"
                                    color="inherit"
                                    onClick={() => filterItem('regional')}>
                                    Regional
                                </Link>
                                <Link
                                    className="text-white"
                                    underline="hover"
                                    color="inherit"
                                    onClick={() => filterItem('national')}>
                                    National
                                </Link>
                                <Link
                                    className="text-white"
                                    underline="hover"
                                    color="inherit"
                                    onClick={() => filterItem('international')}>
                                    International
                                </Link>

                            </Breadcrumbs>



                            <div className="container mb-5">
                                <div className="row  d-flex justify-content-center">

                                    <TextField
                                        className="col-12 col-md-6 bg-white text-black"
                                        id="filled-search"
                                        label="Search field"
                                        type="search"
                                        variant="filled"
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                {filteredTournaments?.map((tournament, i) => (
                                    <div className="col-lg-4 mb-4" key={i}>
                                        <div className="custom-media d-block bg-dark text-center p-2 costum-border costum-card">
                                            <div className="img-container mb-4 text-center" >

                                                <Link to={`/divisions/${tournament._id}`}>
                                                    <img src={`http://localhost:3001/${tournament.tournamentLogo}`} alt="Image" className="img-fluid" style={{ width: '100p%', height: '200px', objectFit: 'cover' }} />
                                                </Link>

                                            </div>
                                            <div className="text">
                                                <span className="meta">May 20, 2020</span>

                                                <h3 className="mb-4">
                                                    <Link to={`/team-single/${tournament._id}`}>
                                                        <div className="game-overlay">
                                                            <h4>{tournament.tournamentName}    </h4>
                                                        </div>
                                                    </Link>
                                                </h3>
                                                <p>Level : {tournament.tournamentLevel}</p>
                                                <p><a href="#">Read more</a></p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>


                        </div>



                    </div >
                )
            }
        </>
    );
}


export default Tournaments;