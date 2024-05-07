import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';



export default function StadingTeams({ teams }) {

    const [teamsPoints, setTeamsPoints] = useState<any>([])

    const fetchTeamsPoints = async () => {
        const response = await axios.post('http://localhost:3001/teamPoints/get-points-teams', { teamsIds: teams });
        const fetchedData = response.data.sort((a, b) => b.points.reduce((a, b) => a + b, 0) - a.points.reduce((a, b) => a + b, 0));
        setTeamsPoints(fetchedData);
    }

    useEffect(() => {
        fetchTeamsPoints();
    }, []);

    useEffect(() => {
        console.log("teamsPoints ", teamsPoints);
    }, [teamsPoints]);








    return (
        <div className="container">


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Club</TableCell>
                            <TableCell align="right">MP</TableCell>
                            <TableCell align="right">W</TableCell>
                            <TableCell align="right">D</TableCell>
                            <TableCell align="right">L</TableCell>
                            <TableCell align="right">PTS</TableCell>
                            <TableCell align="right">Last 5</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teamsPoints.map((teamPoint, index) => {
                            // if (teamPoint.points.length >= 0)
                            return (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">
                                        <div className="row d-flex align-items-center">


                                            <div className="col-auto  d-flex justify-content-center align-items-center">
                                                {index + 1}
                                            </div>

                                            <div className="col-auto  d-flex justify-content-center align-items-center">
                                                <img
                                                    // src={`${process.env.REACT_APP_API_URL}/${teams[teamIndex].logo.replace('\\', '/')}`}
                                                    src={`${process.env.REACT_APP_API_URL}/${teamPoint.team.logo.replace('\\', '/')}`}
                                                    className="img-fluid"
                                                    alt="club logo"
                                                    style={{
                                                        height: '50px',
                                                    }}
                                                />
                                            </div>

                                            <div className="col-auto d-flex justify-content-center align-items-center">
                                                {teamPoint.team.name}
                                            </div>

                                        </div>
                                    </TableCell>
                                    <TableCell align="right">{teamPoint.points.length}</TableCell>
                                    <TableCell align="right">{teamPoint.points.filter(p => p == 3).length}</TableCell>
                                    <TableCell align="right">{teamPoint.points.filter(p => p == 1).length}</TableCell>
                                    <TableCell align="right">{teamPoint.points.filter(p => p == 0).length}</TableCell>
                                    <TableCell align="right">{teamPoint.points.reduce((a, b) => a + b, 0)}</TableCell>
                                    <TableCell align="right">
                                        <div className="row d-flex justify-content-end">
                                            {teamPoint.points.map((point, index) => {
                                                if (index < 5)
                                                    return (
                                                        <i key={index} className={`col-auto fa fa-${point == 3 ? 'check-circle text-success' : point == 1 ? 'minus-circle text-secondary' : 'times-circle text-danger'} fa-2x`}></i>
                                                    )
                                            })}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}