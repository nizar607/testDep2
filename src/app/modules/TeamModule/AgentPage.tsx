import { useParams } from "react-router-dom";
import { useAuth } from "../auth";
import { Container, Row, Col, Button } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getMatchById, updateMatchScore, updateRedCard, updateYellowCard } from "../../../services/MatchService";


function AgentPage() {
    const { divisionId, matchId } = useParams();
    const [match, setMatch] = useState<any>();
    const [teams, setTeams] = useState<any>([]);
    const [selectedPlayer, setSelectedPlayer] = useState<any>();
    const [teamIndex, setTeamIndex] = useState(0);

    const [open, setOpen] = useState(false);

    const handleClickOpen = (player) => {
        setSelectedPlayer(player);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [socket, setSocket] = useState<any>(null);

    const { currentUser } = useAuth();

    const fetchMatch = async () => {
        if (matchId) {
            const response = await getMatchById(matchId);
            console.log("response", response.data);
            setMatch(response.data);


            const data: any = [];
            for (let i = 1, j = 0; i < 27; i++, j++) {

                data.push({
                    _id: -i,
                    playerNumber: -i,
                    firstName: "blank",
                    lastName: "blank",
                    phoneNumber: "blank",
                    email: "blank",
                    age: 0,
                    height: 0,
                    country: "blank",
                    position: "blank",
                    blank: true
                });
            }


            const team1Data = {
                ...response.data.team1,
                players: response.data.team1.players
            };
            const team2Data = {
                ...response.data.team2,
                players: response.data.team2.players
            };

            const data1 = [...data];
            const data2 = [...data];

            team1Data.players.map((player) => { data1[player.position] = player; });
            team2Data.players.map((player) => { data2[player.position] = player; });

            team1Data.players = data1;
            team2Data.players = data2;
            setTeams([team1Data, team2Data]);
        }
    }



    useEffect(() => {
        fetchMatch();


        console.log("teams ", teams);






        const socketInstance: any = io('http://localhost:3002');
        setSocket(socketInstance);



        socketInstance.on('matchScoreUpdated', (data) => {
            console.log(`Received match: `, data);
            setMatch(data);
        });




        return () => {
            if (socketInstance) {
                socketInstance.disconnect();
            }
        };
    }, []);


    const emitMatch = () => {
        console.log("emitting match");
        socket?.emit('update-match-score', matchId);
    }

    const handleAddGoal = async () => {
        console.log("adding goal");
        console.log("selected player ", selectedPlayer);
        console.log("match ", match);
        if (selectedPlayer) {
            const response = await updateMatchScore(match._id, selectedPlayer._id);
            emitMatch();
            console.log("response ", response.data);
        }
    }

    const handleRedCard = async () => {
        console.log("adding red card");
        console.log("selected player ", selectedPlayer);
        console.log("match ", match);
        if (selectedPlayer) {
            const response = await updateRedCard(match._id, selectedPlayer._id);
            emitMatch();
            console.log("response ", response.data);
        }
    }

    const handleYellowCard = async () => {
        console.log("adding yellow card");
        console.log("selected player ", selectedPlayer);
        console.log("match ", match);
        if (selectedPlayer) {
            const response = await updateYellowCard(match._id, selectedPlayer._id);
            emitMatch();
            console.log("response ", response.data);
        }
    }

    return (
        <div>
            <Container className="d-flex flex-column align-items-center">
                <div className="row d-flex justify-content-around text-center align-items-center w-100">
                    <div className="col-auto">
                        <img
                            className="img-fluid"
                            width={150}
                            src={`${process.env.REACT_APP_API_URL}/${teams[0]?.logo.replace('\\', '/')}`}
                            alt="" />
                    </div>



                    <div className="col-auto">
                        <h1>
                            {match?.goals.team1.players.length} - {match?.goals.team2.players.length}
                        </h1>
                    </div>

                    <div className="col-auto">
                        <img
                            className="img-fluid"
                            width={150}
                            src={`${process.env.REACT_APP_API_URL}/${teams[1]?.logo.replace('\\', '/')}`}
                            alt="" />
                    </div>

                </div>
                {/* <button onClick={() => console.log(teams)}>print teams</button> */}
                <Row className="w-100 justify-content-center mb-3">
                    <Button
                        variant="primary"
                        className="me-2 col-auto"
                        onClick={() => setTeamIndex(0)}>
                        team1
                    </Button>
                    <Button
                        variant="primary"
                        className="col-auto"
                        onClick={() => setTeamIndex(1)}>
                        team2
                    </Button>
                </Row>

                <Row
                    style={{
                        width: "80%",
                        height: "1200px",
                        backgroundImage: `url(${toAbsoluteUrl('/images/stadium.png')})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {teams[teamIndex]?.players.map((player, index) => (
                        <Col xs={2}
                            style={{
                                backgroundColor: player?.avatar ? "rgba(63, 63, 63, 0.695)" : "",
                                backgroundSize: "cover",
                                height: "fit-content",
                                position: "relative",
                            }}

                            className="mx-1 py-3 my-2 user"
                        >


                            {
                                player?.avatar ? (
                                    <>
                                        <div
                                            onClick={() => handleClickOpen(player)}
                                            className="container text-white player-card"
                                            id="demo-positioned-button"
                                            aria-haspopup="true"

                                            style={{
                                                height: "fit-content",
                                                cursor: "pointer"
                                            }}>
                                            <div className="row">
                                                <div className="col-4">

                                                    <div>
                                                        <img className="img-fluid" src={`https://flagsapi.com/${player.country}/flat/64.png`} alt="country Flag" />
                                                    </div>
                                                    <div>
                                                        <img className="img-fluid" src={`${process.env.REACT_APP_API_URL}/${teams[teamIndex].logo.replace('\\', '/')}`} alt="Barcelona Logo" />
                                                    </div>
                                                </div>
                                                <div className="col-8">
                                                    <img className="img-fluid" src={`${process.env.REACT_APP_API_URL}/${player.avatar.replace('\\', '/')}`} alt="Messi" draggable="false" />

                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center">
                                                <div className="col-auto player-name">
                                                    <span>{`${player.firstName} ${player.lastName}`}</span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <hr />
                                                <div className="col-12">
                                                    Age: {player.age}
                                                </div>


                                                <div className="col-12">
                                                    Height: {player.height}
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                ) : <div style={{
                                    width: "100%",
                                    minHeight: "150px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "1.5rem",
                                    color: "white",
                                    fontWeight: "bold",
                                }}>
                                </div>
                            }
                        </Col>

                    ))}
                </Row>
            </Container>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Player Actions"}
                </DialogTitle>
                <DialogContent>
                    <Container>

                        <Row className="my-2">

                            <Button variant="outline" color="secondary" onClick={handleAddGoal}>
                                <i className="fa-solid fa-futbol"></i> Add Goal
                            </Button>

                        </Row>

                        <Row className="my-2">
                            {/* onClick={handleAddYellowCard} */}
                            <Button variant="outline" color="secondary" onClick={handleYellowCard}>
                                <i className="fas fa-square text-warning"></i> Add Yellow Card
                            </Button>
                        </Row>

                        <Row className="my-2">
                            {/* onClick={handleAddRedCard} */}
                            <Button variant="outline" color="secondary" onClick={handleRedCard}>
                                <i className="fas fa-square text-danger"></i> Add Red Card
                            </Button>
                        </Row>

                        <Row className="my-2">
                            {/* onClick={handleSubstitute} */}
                            <Button variant="outline" color="secondary">
                                <i className="fas fa-exchange-alt"></i> Substitute Player
                            </Button>
                        </Row>

                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
            <button onClick={() => emitMatch()}>emit match</button>
        </div>
    );
}

export default AgentPage;