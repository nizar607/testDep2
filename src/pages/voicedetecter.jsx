import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const api = import.meta.env.VITE_API_URL;
const MediaCard = ({ player }) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      height="140"
      image={`${api}/${player.avatar}`} // Updated to use dynamic image path with fallback // You might want to change this to a relevant image
      alt={player.playerName}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {player.playerName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Goals: {player.goalsCount}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Number: {player.playerNumber}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        age: {player.age}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        height: {player.height}
      </Typography>

    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
);

const VoiceDetector = () => {
    const [isListening, setIsListening] = useState(false);
    const [message, setMessage] = useState('');
    const [tournaments, setTournaments] = useState([]);
    const navigate = useNavigate();
    const [topScorer, setTopScorer] = useState(null);
    const [showPlayerCard, setShowPlayerCard] = useState(false);

    useEffect(() => {
        fetchTournaments();
    }, []);

    const fetchTournaments = async () => {
        try {
            const response = await fetch('http://localhost:3001/tournament/tournamentsAdmin');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Tournaments fetched:', data);
            setTournaments(data);

            const topScorerResponse = await fetch('http://localhost:3001/match/top-scorer');
            if (!topScorerResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const topScorerData = await topScorerResponse.json();
            console.log('Top scorer fetched:', topScorerData);
            setTopScorer(topScorerData);
        } catch (error) {
            console.error('Error fetching tournaments:', error);
            setMessage('Error fetching tournaments');
        }
    };

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.onstart = () => {
            console.log('Voice recognition is on. Speak into the microphone.');
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const current = event.resultIndex;
            const transcript = event.results[current][0].transcript.trim().toLowerCase();
            console.log(`Heard: ${transcript}`);
            if (transcript.includes("hello")) {
                recognition.stop();
                setIsListening(false);
                setMessage("Hello sir");
                speak("Hello sir");
            } else if (transcript.includes("tournament") && tournaments.length > 0) {
                recognition.stop();
                setIsListening(false);
                const allTournamentNames = tournaments.map(t => t.tournamentName).join(", ");
                setMessage(allTournamentNames);
                speak("The available tournaments are " + allTournamentNames);
            } else if (transcript.includes("best") && topScorer) {
                recognition.stop();
                setIsListening(false);
                
                speak(`The top scorer is ${topScorer.playerName} with ${topScorer.goalsCount} goals.`);
                setShowPlayerCard(true);
                setTimeout(() => {
                    setShowPlayerCard(false);
                }, 5000);
            } else if (transcript.includes("live")) {
                recognition.stop();
                setIsListening(false);
                navigate('/livematches');

             } else if (transcript.includes("link up")) {
                    recognition.stop();
                    setIsListening(false);
                    speak("This innovative football tournament management system aims to revolutionize how football academies organize and manage tournaments");
                
            } else if (transcript.includes("team")) {
                recognition.stop();
                setIsListening(false);
                fetch('http://localhost:3001/team/team-with-max-points')
                    .then(response => response.json())
                    .then(data => {
                        setMessage(`The team with maximum points is ${data.teamName} with ${data.maxPoints} points.`);
                        speak(`The team with maximum points is ${data.teamName} with ${data.maxPoints} points.`);
                    })
                    .catch(error => {
                        console.error('Error fetching team with max points:', error);
                        setMessage('Error fetching team with max points');
                    });
            }
        };

        recognition.onend = () => {
            if (isListening) {
                recognition.start();
            }
        };

        recognition.start();
    };

    const speak = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 1000 }}>
            <button onClick={startListening} disabled={isListening} style={{ padding: '10px', fontSize: '16px', borderRadius: '10%', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
                {isListening ? 'Listening...' : 'Start Listening'}
            </button>
            <p style={{ color: 'white', textAlign: 'center' }}>{message}</p>
            {showPlayerCard && topScorer && <MediaCard player={topScorer} />}
        </div>
    );
};

export default VoiceDetector;
