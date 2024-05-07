import { useParams } from 'react-router-dom';
import bgImage from '../assets/images/bg_3.jpg';
import divisionLogo from '../assets/images/division.png';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDivisionsByTournament } from '../services/DivisionsService';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Players from '../sections/Players';
import Stats from '../sections/Stats';
import Matches from '../sections/Matches';
import DivisionContent from '../sections/DivisionContent';

function Divisions() {

    const params = useParams();
    const tournamentId = params.tournamentId;
    const [divisions, setDivisions] = useState([]);
    const [division, setDivision] = useState(null);
    const [divisionLink, setDivisionLink] = useState("composition");
    const [test, setTest] = useState();

    useEffect(() => {
        const fetchDivisions = async () => {
            const response = await getDivisionsByTournament(tournamentId);
            setDivisions(response.data);
            setDivision(response.data[0]);
        }

        fetchDivisions();
    }, [tournamentId]);

    // useEffect(() => {
    //     fetchDivisions();
    //     setTest(
    //         <div className="row">
    //             {divisionLink === "composition" && <Stats divisionId={division?._id} />}
    //             {divisionLink === "stats" && <div>Stats</div>}
    //             {divisionLink === "matches" && <Matches divisionId={division?._id} />}
    //             {divisionLink === "players" && <Players divisionId={division?._id} />}
    //         </div>
    //     )
    // }, []);

    const fetchDivisions = async () => {
        const response = await getDivisionsByTournament(tournamentId);
        setDivisions(response.data);
        setDivision(response.data[0]);
    }

    useEffect(() => {
        if (division) {
            setTest(

            );
        }
    }, [division, divisionLink]);



    return (

        divisions.length === 0 ?
            <div className="hero d-flex align-items-center justify-content-center">
                <h1>no divisions</h1>
            </div> :
            < div >
                <div className="latest-news">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 title-section" >
                                <h2 className="heading">Divisions List</h2>
                            </div>
                        </div>
                        <div className="d-flex no-gutters" style={{ overflowX: 'auto', maxWidth: '100vw' }}>
                            {divisions.map((d, i) => (
                                <div
                                    key={i}
                                    onClick={() => setDivision(d)}
                                    className="costum-division col-12 col-md-2 ms-1 mb-1"
                                    style={{ flex: '0 0 auto' }} // Ensure each division is of fixed width
                                >
                                    <div className="post-entry">
                                        <a href="#">
                                            <img src={divisionLogo} alt="Image" className="img-fluid" />
                                        </a>
                                        <div className={`caption costum-caption  ${d === division ? "selected-division" : ""}`}>
                                            <div className="caption-inner text-center">
                                                <h1 style={{ fontWeight: "700" }}>{d.name}</h1>
                                                <div className="author d-flex align-items-center">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="row my-5 justify-content-center" style={{ overflowX: 'auto', maxWidth: '100vw' }}>

                            <div className={`costum-division-links col-6 col-md-2 text-center pb-2 pt-1 ${divisionLink === "composition" ? "costum-division-link-selected" : ""}`} onClick={() => setDivisionLink("composition")}>

                                {division?.tournamentType == "singlematch" ?
                                    <h5>Composition</h5>
                                    :
                                    <h5>Standings</h5>
                                }

                            </div>

                            <div className={`costum-division-links col-6 col-md-2 text-center pb-2 pt-1 ${divisionLink === "stats" ? "costum-division-link-selected" : ""}`} onClick={() => setDivisionLink("stats")}>
                                <h5>Stats</h5>
                            </div>

                            <div className={`costum-division-links col-6 col-md-2 text-center pb-2 pt-1 ${divisionLink === "matches" ? "costum-division-link-selected" : ""}`} onClick={() => setDivisionLink("matches")}>
                                <h5>Matches</h5>
                            </div>

                            <div className={`costum-division-links col-6 col-md-2 text-center pb-2 pt-1 ${divisionLink === "players" ? "costum-division-link-selected" : ""}`} onClick={() => setDivisionLink("players")}>
                                <h5>Players</h5>
                            </div>

                        </div>

                    </div>

                    <div className="container">

                        <DivisionContent divisionLink={divisionLink} division={division} />

                    </div>
                </div>
            </div >

    )
}

export default Divisions;