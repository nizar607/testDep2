import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../modules/auth';
import TournamentBracket from '../../../../../_metronic/partials/widgets/Bracket/TournamentBracket';
import axios from 'axios';
import io from 'socket.io-client';
import ParticleBg from '../ParticleBg';




const SingleMatchBracket = () => {

  const [matches, setMatches] = useState([]);
  const [socket, setSocket] = useState<any>(null);
  const [match, setMatch] = useState<any>({});



  useEffect(() => {
  const socketInstance: any = io('http://localhost:3002');
    setSocket(socketInstance);


    socketInstance.on('matchScoreUpdated', (data) => {


      if (matches.find((match: any) => match._id === data._id)) {
        setMatch(data);
      }

      console.log(`Received match: `, data);
    });




    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [matches]);

  const emitMatch = () => {
    console.log("emitting match");
    socket?.emit('update-match-score', match._id);
  }
  useEffect(() => {
    console.log('match updated', match);

    if (match?.status === 'Terminé') {
      const updateNextMatch = async () => {
        try {
          const nextMatch = await axios.get(`${process.env.REACT_APP_API_URL}/front/matchbyid/${match.nextMatchId}`, {
            headers: {
              Authorization: `Bearer ${auth?.api_token}`
            }
          });
          console.log('next match', nextMatch);
          // if (nextMatch.data.team1 !== match.winner && nextMatch.data.team2 !== match.winner) {
          const response = await axios.patch(`${process.env.REACT_APP_API_URL}/match/update-next-match/${match.nextMatchId}`, {
            team: match.winner
          }, {
            headers: {
              Authorization: `Bearer ${auth?.api_token}`
            }
          });
          console.log('response', response);
          // emitMatch();
          // }
        } catch (error) {
          console.error('Error updating next match:', error);
        }
      };

      updateNextMatch();
    }
  }, [match]);




  //get the division id from the route
  const { id } = useParams();
  console.log('division id of this bracket ', id);
  const { auth } = useAuth();











  //get the matches from the database
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        // change it with axios not fetch 
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/match/getMatches/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.api_token}`
          }
        });
        const data = await response.data;
        console.log('bracket matches', data.matches);
        setMatches(data.matches);
      } catch (error) {
        console.error('Error fetching divisions:', error);
      }
    };

    fetchDivisions();
  }, [id, auth?.api_token]);

  return (
    <>
      
    <div  >
      

      <TournamentBracket matches={matches} />
     

    </div>
    </>
  );
};
export default SingleMatchBracket;