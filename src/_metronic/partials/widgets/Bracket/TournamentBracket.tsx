import React, { useEffect, useState } from 'react';
import MatchComponent from './MatchComponent';
import { Match } from './MatchModel';
import axios from 'axios';  


interface TournamentBracketProps {
  matches: Match[];
}

const TournamentBracket: React.FC<TournamentBracketProps> = ({ matches }) => {
  const [team, setTeam] = useState<{ name: string  , logo : string , location : string} | null>(null);
  const apiUrl = 'http://localhost:3001';
  console.log('matches', matches);
  

  useEffect(() => {
    const fetchTeam = async () => {
        const lastMatch = matches[matches.length - 1];
        if (lastMatch && lastMatch.winner) {
            try {
                const response = await axios.get(`http://localhost:3001/team/team/${lastMatch.winner}`);
                console.log('response team winner', response.data);
                setTeam(response.data.team);
            } catch (error) {
                console.error('Error fetching team:', error);
            }
        }
    };

    fetchTeam();
}, [matches]);


/*
  const [updatedMatches, setUpdatedMatches] = useState<Match[]>([]);


  useEffect(() => {
    // Copy the matches to a new array to prevent direct state mutation
    let updatedMatches = [...matches];

    // Function to find and update a match by ID
    const updateMatchTeams = (matchId: string, winner: { _id: string; name: string }) => {
      const matchIndex = updatedMatches.findIndex(match => match._id === matchId);
      if (matchIndex !== -1) {
        // Check if team1 is null or not set, and set it to winner if so
        if (!updatedMatches[matchIndex].team1) {
          updatedMatches[matchIndex].team1 = winner;
        } else if (!updatedMatches[matchIndex].team2) { // Otherwise, set team2 to winner if team1 is already occupied
          updatedMatches[matchIndex].team2 = winner;
        }
        // Note: If both team1 and team2 are already set, this does nothing. You may want to add logic to handle unexpected scenarios.
      }
    };


    // Loop through matches to find winners and update the next matches accordingly
    updatedMatches.forEach(match => {
      if (match.winner) {
        updateMatchTeams(match.nextMatchId as string, match.winner);
      }
    });

    setUpdatedMatches(updatedMatches);
  }, [matches]);



  */


  const rounds = matches.reduce((acc: Record<string, Match[]>, match) => {
    const round = match?.round?.toString();
    if (!acc[round]) {
      acc[round] = [];
    }
    acc[round].push(match);
    return acc;
  }, {});


  return (
    <div className="" style={{ width: 'auto', height: '600px', overflow: 'auto', whiteSpace: 'nowrap' }}>


            {team ? (
              <div style={{
                border: '3px solid #ddd',
                borderRadius: '10px',
                padding: '20px',
                margin: '20px',
                textAlign: 'center',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f9f9f9',
                transition: '0.3s'
              }}>
                <h2 style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: '1.5em' }}>Winner</h2> <br />
                
                <img src={`${apiUrl}/${team.logo}`} alt={team.name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: '10px 0' }}>{team.name}</h1>
              </div>
            ) : null}
            <br /><br />
        
        
      
      {Object.keys(rounds).map((round, index, allRounds) => (
        <div key={round} style={{ display: 'inline-block', width: '400px', verticalAlign: 'top', margin: '0 10px' }}>
          <h2 className='text-center'>
            {index === allRounds.length - 1 ? 'Final' :
              index === allRounds.length - 2 ? 'Semi Final' :
                `Round ${round}`}
          </h2>
          {rounds[round].map((match) => (
            <MatchComponent key={match._id} match={match} />
          ))}
        </div>
      ))}
    </div>

  );
};

export default TournamentBracket;
