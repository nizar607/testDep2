import React from 'react';
import { FaClock, FaFlag, FaTrophy, FaUser, FaUsers } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDivision } from '../services/DivisionsService';

import Standings from './Standings';
import { getMatchesByDivision } from '../services/MatchService';
import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import MixedBracket from './MixedBracket';


function Stats({ divisionId }) {

    const [activeDivision, setActiveDivision] = useState(null);
    const [matches, setMatches] = useState([]);
    const [subDivisionLink, setSubDivisionLink] = useState("bracket");

    useEffect(() => {
        fetchDivision();
        fetchMatches()
    }, []);

    useEffect(() => {
        fetchDivision();
        fetchMatches()
    }, [divisionId]);


    const transformMatches = (matches) => {
        return matches.map((match, index) => {
            const participants = [
                {
                    id: match.team1?._id,
                    resultText: "Null", // You might need a logic to determine the result text
                    isWinner: false, // You might need a logic to determine the winner
                    status: null, // Assuming all matches are not played yet; adjust as necessary
                    name: match.team1?.name,
                },
                {
                    id: match.team2?._id,
                    resultText: "Null", // You might need a logic to determine the result text
                    isWinner: false, // You might need a logic to determine the winner
                    status: null, // Assuming all matches are not played yet; adjust as necessary
                    name: match.team2?.name,
                }
            ];
            const date = new Date(match.time);
            const formattedDate = date.toLocaleString();

            return {
                id: match._id,
                name: `Match ${index + 1}`, // Adjust name as necessary
                nextMatchId: match.nextMatchId || null, // Adjust based on your data structure
                tournamentRoundText: match.round, // Adjust based on your data structure
                startTime: formattedDate,
                state: "DONE", // Assuming all matches are done; adjust as necessary
                participants,
            };
        });
    };

    const fetchMatches = async () => {
        try {
            const response = await getMatchesByDivision(divisionId);
            const matches = response.data.matches;
            //console.log('Matches:', response.data);
            setMatches(matches);
        } catch (error) {
            //console.error('Error:', error);
        }
    }

    const fetchDivision = async () => {
        const response = await getDivision(divisionId);
        setActiveDivision(response.data);
    }

    return (
        activeDivision ? (
            <div className="achievement-section padding-top padding-bottom mt-10">
                <div className="container-fluid">
                    <div className="section-wrapper">
                        <div className="achievement-area">



                            {/* Division Details of the active tab */}
                            <div className="tab-content" id="myTabContent">
                                {activeDivision && (
                                    <div style={{
                                        padding: '20px',
                                        borderRadius: '5px',
                                        marginBottom: '20px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        flexWrap: 'wrap',
                                    }}
                                        className={`${activeDivision.tournamentType == "singlematch" ? "bg-white" : ""}`} >
                                        {activeDivision.tournamentType == "singlematch" && activeDivision.status === 'completed' && (
                                            <>
                                                <div>
                                                    <h2 style={{ margin: '0 0 10px', color: '#232A5C' }}>Division Details</h2> </div>
                                                <div>
                                                    <p style={{ margin: '0 0 5px', color: '#232A5C' }}><FaUsers /> Number of Teams : {activeDivision.NumberTeams}</p>
                                                    <p style={{ margin: '0 0 5px', color: '#232A5C' }}><FaUser /> Players per Team : {activeDivision.PlayerPerTeam}</p>
                                                </div>
                                                <div>
                                                    <p style={{ margin: '0 0 5px', color: '#232A5C' }}><FaClock /> Match Duration : {activeDivision.MatchDuration}</p>
                                                    <p style={{ margin: '0 0 5px', color: '#232A5C' }}><FaFlag /> ExtraTime : {activeDivision.ExtraTime === true ? 'Allowed' : 'No Extratime'}</p>
                                                </div>
                                                <div>
                                                    <p style={{ margin: '0 0 5px', color: '#232A5C' }}>
                                                        <FaTrophy />  type : {activeDivision.tournamentType === 'singlematch' ? 'Single Match Elimination' :
                                                            activeDivision.tournamentType === 'mixed' ? 'Group Stage followed by Knockout Rounds' :
                                                                activeDivision.tournamentType}
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        {activeDivision.tournamentType == "mixed" && (
                                            <>

                                                <div className="row d-flex justify-content-center">

                                                    <div

                                                        className={`costum-division-links col-6 col-md-2 text-center pb-2 pt-1 border border-bottom-white  costum-division-link-selected ${subDivisionLink === "bracket" ? "bg-primary" : "bg-dark"}`} onClick={() => setSubDivisionLink("bracket")}>
                                                        <h5>standing table</h5>
                                                    </div>

                                                    <div className={`costum-division-links col-6 col-md-2 text-center pb-2 pt-1 border border-bottom-white ${subDivisionLink === "standing" ? "bg-primary" : "bg-dark"}`} onClick={() => setSubDivisionLink("standing")}>
                                                        <h5>bracket</h5>
                                                    </div>

                                                    <div className="col-12">

                                                        {subDivisionLink === "bracket" ? (
                                                            <MixedBracket stages={activeDivision.stages} />
                                                        )
                                                            :
                                                            (
                                                                activeDivision.stages[0].groups.map((group, index) => (
                                                                    <Standings teams={group.teams} />
                                                                ))
                                                            )}

                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {activeDivision.tournamentType == "championship" && (
                                            <>
                                                <Standings teams={activeDivision.teams} />
                                            </>
                                        )}

                                        <p style={{
                                            alignSelf: 'flex-end',
                                            color: activeDivision.status === 'completed' ? 'green' : 'red',
                                            fontWeight: 'bold'
                                        }}>
                                            {activeDivision.status === 'completed' ? 'Done' : 'In Progress ...'}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div>
                                {matches.length > 0 && activeDivision.status === 'completed' && activeDivision.tournamentType == 'singlematch' ? (
                                    <>
                                        <h3 className="text-center mb-3" style={{
                                            backgroundColor: '#232A5C',
                                            color: '#fff',
                                            padding: '10px 0',
                                            borderRadius: '5px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>
                                            Division Overview
                                        </h3>
                                        <center>
                                            <SingleEliminationBracket
                                                matches={transformMatches(matches)}
                                                matchComponent={Match}
                                                svgWrapper={({ children, ...props }) => (
                                                    <SVGViewer width={1050} height={800} {...props}>
                                                        {children}
                                                    </SVGViewer>
                                                )}
                                            />
                                        </center>




                                    </>
                                ) : (
                                    <div>Loading matches...</div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
            : (
                <div>
                    <h2>Division Stats</h2>
                    <p>No Stats available yet :/</p>
                </div>
            )
    )
}

export default Stats;