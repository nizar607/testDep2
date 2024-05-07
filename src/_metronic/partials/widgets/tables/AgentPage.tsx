import { useParams } from "react-router-dom";
import { useAuth } from "../../../../app/modules/auth";
import { Container, Row, Col, Button } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../helpers";
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getMatchById, updateMatchScore, updateRedCard, updateYellowCard, updateMatchStatus, updateSubstitution, updateCorner, updateShotOnTarget, patchMatch, updateStats, addImageEvent } from "../../../../services/MatchService";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import './AgentPage.css';
import axios from "axios";
import { patchPlayer } from "../../../../services/PlayerService";
import { updateTeam } from "../../../../services/TeamService";



function AgentPage() {

  const [match, setMatch] = useState<any>({});
  const [hasNoRedCard, setHasNoRedCard] = useState<any>(true);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isOpenSubstitute, setIsOpenSubstitute] = useState(false);
  const [teams, setTeams] = useState<any>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<any>();
  const [selectedSubstitute, setSelectedSubstitute] = useState<any>();
  const [teamIndex, setTeamIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState<any>(null);
  const { currentUser } = useAuth();
  const { auth } = useAuth();

  const handleClickOpen = (player) => {

    match.events.map((event) => { console.log(event) });
    if (match.events.filter((event) => event.action == "red" && event.player._id == player._id).length >= 1) {
      setHasNoRedCard(false);
    } else {
      setHasNoRedCard(true);
    }
    setSelectedPlayer(player);
    setOpen(true);
  };






  const handleSubstitution = async (substitute: any) => {

    console.log("performing subtitution");
    console.log("selected player ", selectedPlayer);
    const team = teams[teamIndex];

    if (selectedPlayer && substitute && team) {

      const response = await updateSubstitution(match._id, team._id, selectedPlayer._id, substitute._id);
      emitMatch();
      console.log("response ", match);

    }


  }


  useEffect(() => {
    console.log("teams here ", teams);
  }, [teams]);

  const handleClose = () => {
    setOpen(false);
    setIsOpenSubstitute(false);
  };





  const fetchMatch = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user/agent/match', {
        headers: {
          Authorization: `Bearer ${auth?.api_token}`,
        },
      });
      if (response.data && response.data.length > 0) {
        // Sort matches by date closest to today's date
        const sortedMatches = response.data.sort((a, b) => {
          const distanceA = Math.abs(new Date().getTime() - new Date(a.time).getTime());
          const distanceB = Math.abs(new Date().getTime() - new Date(b.time).getTime());
          return distanceA - distanceB;
        });
        // Take the closest match
        const closestMatch = sortedMatches[0];

        setMatch(closestMatch);
        setIsFinished(closestMatch.status === "Terminé");
      } else {
        console.error('No match data received');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error fetching match:', error.message);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };


  const handleDeleteMatch = async () => {
    if (match) {
      try {
        const response = await axios.put(`http://localhost:3001/user/agent/deletematch`, {
          headers: {
            Authorization: `Bearer ${auth?.api_token}`,
          },
        });

        if (response.status === 200) {
          alert('Match deleted successfully.');
          setMatch({});
        }
      } catch (error) {
        console.error('Error deleting match:', error);
        alert('Error deleting match.');
      }
    }


  }



  useEffect(() => {
    fetchMatch();



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

  useEffect(() => {

    console.log("response", match);


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



      const team1Data = {
        ...match.team1,
        players: match?.team1?.players || []
      };
      const team2Data = {
        ...match.team2,
        players: match?.team2?.players || []
      };

      const data1 = [...data];
      const data2 = [...data];

      team1Data.players.map((player) => { data1[player.position] = player; });
      team2Data.players.map((player) => { data2[player.position] = player; });

      team1Data.players = data1;
      team2Data.players = data2;
      setTeams([team1Data, team2Data]);
    }
  }, [match]);


  const emitMatch = () => {
    console.log("emitting match");
    socket?.emit('update-match-score', match._id);
  }

  const handleAddGoal = async () => {
    console.log("adding goal");
    console.log("selected player ", selectedPlayer);
    console.log("match ", match);
    if (selectedPlayer) {
      const response = await updateMatchScore(match._id, selectedPlayer._id);
      emitMatch();
      console.log("response ", match);
    }
  }



  const handleCorner = async () => {
    console.log("adding corner");
    console.log("selected player ", selectedPlayer);
    console.log("match ", match);
    if (selectedPlayer) {
      const response = await updateCorner(match._id, selectedPlayer._id);
      emitMatch();
      console.log("response ", match);
    }
  }

  const handleShotOnTarget = async () => {
    console.log("adding shot on target");
    console.log("selected player ", selectedPlayer);
    console.log("match ", match);
    if (selectedPlayer) {
      const response = await updateShotOnTarget(match._id, selectedPlayer._id);
      emitMatch();
      console.log("response ", match);
    }
  }


  const handleRedCard = async () => {
    console.log("adding red card");
    console.log("selected player ", selectedPlayer);
    console.log("match ", match);
    if (selectedPlayer) {
      const response = await updateRedCard(match._id, selectedPlayer._id);
      setHasNoRedCard(false);
      emitMatch();
      console.log("response ", match);
    }
  }


  const handleYellowCard = async () => {
    console.log("adding yellow card");
    console.log("selected player ", selectedPlayer);
    console.log("match ", match);

    if (selectedPlayer) {
      const playerEvents = match.events.filter(event => event.player._id === selectedPlayer._id);
      if (playerEvents.filter(event => event.action === "yellow").length >= 1) {
        console.log("has double yellow card")
        handleRedCard();
        setHasNoRedCard(false);
      } else {
        const response = await updateYellowCard(match._id, selectedPlayer._id);
        emitMatch();
        console.log("response ", match);
      }
    }
  }
  const getRemainingTime = () => {
    const matchStartTime = new Date(match?.time).getTime();
    const timeDifference = matchStartTime - currentTime.getTime();

    if (matchStartTime > Date.now() + match.division?.MatchDuration) {
      return match.division.MatchDuration
    }
    // Check if the match has already started
    if (timeDifference <= 0) {
      // Match has started or already finished
      const totalSeconds = Math.abs(Math.floor(timeDifference / 1000));
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    } else {
      // Match has not started yet
      const totalSeconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isStarted) {
        setCurrentTime(new Date());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted]);


  const updateNextMatch = async (updatedMatch) => {
    try {

      console.log("match.winner ", updatedMatch.winner);
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/match/update-next-match/${updatedMatch.nextMatchId}/${updatedMatch.winner}`, {});
      console.log('response', response);

    } catch (error) {
      console.error('Error updating next match:', error);
    }
  };

  const handleFinishMatch = async () => {

    if (match) {
      console.log("match pouplated with division ", match.division);

      const response = await updateMatchStatus(match._id, match.division._id, "Terminé");

      if (match.division.tournamentType == "singlematch") {
        await updateNextMatch(response.data);
      }
      setIsFinished(true);
      setIsStarted(false);
      emitMatch();
    }

  }

  const handleStartMatch = async () => {
    if (match && !isStarted) {
      const response = await updateMatchStatus(match._id, match.division._id, "En cours");
      emitMatch();
    }
  }

  async function handleVideoChange(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('video', file);


    try {
      const response = await axios.post('http://localhost:8000/api/analyse-video/', formData);
      console.log("response ", response.data);
      const test = await updateStats({ stats: response.data }, match._id);
      console.log("test ", test.data);
      emitMatch();
      const toastId = toast("Waiting...", { autoClose: false });

      toast.update(toastId, {
        render: "Video uploaded successfully!",
        type: 'success',
        autoClose: 2000,
        onClose: () => { }
      });

    } catch (err) {
      console.log("error ", err);
    }



  }

  async function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      try {
        await addImageEvent(file, match._id);
        emitMatch();
        const toastId = toast("Waiting...", { autoClose: false });

        toast.update(toastId, {
          render: "Image uploaded successfully!",
          type: 'success',
          autoClose: 2000,
          onClose: () => { }
        });
        

      } catch (error) {
        console.error(error);
      }
    } else {
      console.warn('No file selected');
    }
  }



  return (
    <div>
      <ToastContainer />
      <Container className="d-flex flex-column align-items-center">
        <div className="row d-flex">

          <label className="btn btn-primary col-auto me-2">
            <i className="fa-solid fa-video "></i>
            Upload video
            <input type="file" accept="video/*" hidden onChange={handleVideoChange} />
          </label>

          <label className="btn btn-primary col-auto">
            <i className="fa-solid fa-upload"></i>
            Upload image
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </label>


        </div>
        <div className="row d-flex justify-content-around text-center align-items-center w-100">
          <div className="col-auto">

            <img
              className="img-fluid"
              width={150}
              src={`${process.env.REACT_APP_API_URL}/${teams[0]?.logo?.replace('\\', '/')}`}
              alt="" />
          </div>



          <div className="col-auto">

            <div className="row justify-content-center">

              <div className="row justify-content-center">

                <div className="col-auto">
                  <h1>
                    {match?.goals?.team1.players.length} - {match?.goals?.team2.players.length}
                  </h1>
                </div>
              </div>

              <div className="row row justify-content-center">
                <div className="col-auto">
                  <h1 className="clock" style={
                    {
                      color: isStarted ? 'green' : 'red',
                      fontSize: '3rem',
                    }
                  }>

                    {getRemainingTime()}
                  </h1>
                </div>
              </div>

            </div>

          </div>

          <div className="col-auto">
            <img
              className="img-fluid"
              width={150}
              src={`${process.env.REACT_APP_API_URL}/${teams[1]?.logo?.replace('\\', '/')}`}
              alt="" />
          </div>

        </div>

        <Row className="w-100 justify-content-center mb-3 align-items-center">

          <Button
            variant={isStarted ? 'danger' : 'success'}
            className="col-auto"
            // disabled={!isFinished}
            onClick={() => {
              setIsStarted(!isStarted)
              handleStartMatch();
            }
            }>


            <i className={isStarted ? "fas fa-stop" : "fas fa-play"}></i> {isStarted ? 'Stop' : 'Start'}
          </Button>


          <b className="col-auto">
            team1 :
          </b>


          <Button
            variant="primary"
            className="me-2 col-auto"
            onClick={() => setTeamIndex(0)}>
            {match?.team1?.name}
          </Button>

          <b className="col-auto">
            team2 :
          </b>

          <Button
            variant="primary"
            className="col-auto"
            onClick={() => setTeamIndex(1)}>
            {match?.team2?.name}
          </Button>




          <Button
            variant='secondary'
            className={`ms-4 col-auto` + (isFinished ? ' disabled' : '')}
            onClick={() => handleFinishMatch()}>
            <i className="fa-solid fa-check"></i> finish
          </Button>

          <Button
            variant="primary"
            className="col-auto"
            onClick={() => handleDeleteMatch()}>
            Delete Match
          </Button>


        </Row>

        <Row
          style={{
            height: "1200px",
            backgroundImage: `url(${toAbsoluteUrl('/images/stadium.png')})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
          className="w-100 w-sm-75"
        >
          {teams[teamIndex]?.players.map((player, index) => (

            <Col xs={2}
              key={index}
              className={`position-relative mx-1 py-3 my-2 user ${player?.avatar ? "big-screen-bg" : ""} `}
            >

              {match?.events?.reverse()?.map((event, i) => {
                return <>
                  {event?.action === "goal" &&
                    event?.player?._id === player?._id &&
                    <i className="d-block position-absolute bottom-0 end-0 fa-regular fa-futbol text-white fs-5"></i>}
                  {event?.action === "yellow" &&
                    event?.player?._id === player?._id &&
                    <i className="d-block position-absolute top-0 start-75 fa fa-square text-warning fs-5"></i>}
                  {event?.action === "red" &&
                    event?.player?._id === player?._id &&
                    <i className="d-block position-absolute top-0 end-0 fa fa-square text-danger fs-5"></i>}
                </>
              })}


              {
                player?.avatar ? (
                  <>
                    <div
                      onClick={() => handleClickOpen(player)}
                      className="container text-white player-card d-none d-sm-block"
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
                            <img className="img-fluid" src={`${process.env.REACT_APP_API_URL}/${teams[teamIndex]?.logo?.replace('\\', '/')}`} alt="Barcelona Logo" />
                          </div>

                        </div>

                        <div className="col-8">
                          <img className="img-fluid" src={`${process.env.REACT_APP_API_URL}/${player?.avatar?.replace('\\', '/')}`} alt="Messi" draggable="false" />
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
                    <div className="d-flex flex-column">
                      <img className="d-block d-sm-none bg-primary border border-white rounded-circle img-fluid" src={`${process.env.REACT_APP_API_URL}/${player?.avatar?.replace('\\', '/')}`} alt="Messi" draggable="false" />
                      <span className="row text-white">{`${player.firstName} ${player.lastName}`}</span>
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
            </Col >

          ))}

        </Row>
      </Container>

      <Dialog
        open={open && !isFinished && hasNoRedCard}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Player Actions"}
        </DialogTitle>
        <DialogContent>
          <Container>

            <Row className="my-2" >
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
              <Button
                onClick={() => { setIsOpenSubstitute(true); setOpen(false) }}
                variant="outline"
                color="secondary">
                <i className="fas fa-exchange-alt"></i> Substitute Player
              </Button>
            </Row>

            <Row className="my-2">
              <Button
                onClick={handleCorner}
                variant="outline"
                className="d-flex align-items-center justify-content-around"
                color="secondary">
                <img
                  className="img-fluid"
                  src={toAbsoluteUrl('/media/logos/corner.png')}
                  alt="corner"
                  style={{ height: '2em' }} /> Add Corner
              </Button>
            </Row>

            <Row className="my-2">
              <Button
                onClick={handleShotOnTarget}
                variant="outline"
                className="d-flex align-items-center justify-content-around"
                color="secondary">
                <img
                  className="img-fluid"
                  src={toAbsoluteUrl('/media/logos/shot-on-target.png')}
                  alt="corner"
                  style={{ height: '2em' }} /> Shot on Target
              </Button>
            </Row>

          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isOpenSubstitute}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Player Actions"}
        </DialogTitle>
        <DialogContent>
          <Container>

            <div className="d-flex my-2" style={{ overflowX: "auto" }}>
              {/* onClick={handleSubstitute} */}
              {teams[teamIndex]?.subtitutes?.map((player, index) => (
                <Col xs={4}
                  key={index}
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
                          onClick={() => handleSubstitution(player)}
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
                                <img className="img-fluid" src={`${process.env.REACT_APP_API_URL}/${teams[teamIndex]?.logo?.replace('\\', '/')}`} alt="Barcelona Logo" />
                              </div>

                            </div>

                            <div className="col-8">
                              <img className="img-fluid" src={`${process.env.REACT_APP_API_URL}/${player?.avatar?.replace('\\', '/')}`} alt="Messi" draggable="false" />
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
                </Col >

              ))}
            </div>

          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

    </div >
  );
}

export default AgentPage;