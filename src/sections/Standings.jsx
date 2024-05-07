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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faMinusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'



export default function StadingTeams({ teams }) {

    const [teamsPoints, setTeamsPoints] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchTeamsPoints = async () => {
        const response = await axios.post('http://localhost:3001/teamPoints/get-points-teams', { teamsIds: teams });
        const fetchedData = response.data.sort((a, b) => b.points.reduce((a, b) => a + b, 0) - a.points.reduce((a, b) => a + b, 0));
        setTeamsPoints(fetchedData);
    }

    useEffect(() => {
        fetchTeamsPoints();
    }, []);

    useEffect(() => {
        //console.log("teamsPoints ", teamsPoints);
    }, [teamsPoints]);








    return (
        <div className="container my-5">

            <div className="col-lg-12">
                <div className="widget-next-match">
                    <table className="table custom-table bg-dark border border-primary">
                        <thead>
                            <tr>
                                <th>P</th>
                                <th>Team</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>PTS</th>
                                <th className="text-center">
                                    Last 5
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamsPoints.map((teamPoint, index) => (
                                <tr className="text-white" key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <strong className="text-white">
                                            <img
                                                src={`${apiUrl}/${teamPoint.team.logo.replace('\\', '/')}`}
                                                className="img-fluid border border-primary me-3 rounded"
                                                alt="club logo"
                                                style={{ height: '50px', width: '50px' }}
                                            />
                                            {teamPoint.team.name}
                                        </strong>
                                    </td>
                                    <td>{teamPoint.points.filter(p => p == 3).length}</td>
                                    <td>{teamPoint.points.filter(p => p == 1).length}</td>
                                    <td>{teamPoint.points.filter(p => p == 0).length}</td>
                                    <td>{teamPoint.points.reduce((a, b) => a + b, 0)}</td>
                                    <td className="text-center">
                                        {teamPoint.points.map((point, index) => {
                                            if (index < 5)
                                                return (
                                                    <FontAwesomeIcon
                                                        key={index}
                                                        className={`col-auto ${point == 3 ? 'text-success' : point == 1 ? 'text-secondary' : 'text-danger'}`}
                                                        icon={point == 3 ? faCheckCircle : point == 1 ? faMinusCircle : faTimesCircle}
                                                    />)
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}