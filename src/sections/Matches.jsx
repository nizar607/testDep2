
import React, { useEffect, useState } from 'react';
import { FaClock, FaFlag, FaTrophy, FaUser, FaUsers, FaFlagCheckered } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getDivision } from '../services/DivisionsService';
import { getMatchesByDivision } from '../services/MatchService';
import MatchCard from './MatchCard';

function Matches({ divisionId }) {

    const [matches, setMatches] = useState([]);


    useEffect(() => {
        fetchMatches();
    }, [divisionId]);

    useEffect(() => {
        console.log('Matches:', matches);
    }, [matches]);


    const fetchMatches = async () => {
        try {
            console.log('Division ID:', divisionId);
            const response = await getMatchesByDivision(divisionId);
            const matches = response.data.matches;
            console.log('Matches:', response.data);
            setMatches(matches);
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <>
            {/* Matches of the active division */}
            <h3 className="text-center mb-3" style={{
                backgroundColor: '#232A5C',
                color: '#fff',
                padding: '10px 0',
                borderRadius: '5px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
            }}>
                Planned Matches
            </h3>
            <MatchCard matches={matches} />
        </>
    )
}

export default Matches;