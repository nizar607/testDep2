import TeamModal from "./components/TeamModal";
import { useEffect, useState } from "react";
import Team from "./components/Team";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import { Link, useLocation } from "react-router-dom";
import { setPopulatedTeams, useAppDispatch, selectTeamReducer } from "../../../redux/slices/teamsSlice";
import { KTIcon } from "../../../_metronic/helpers";


function ManagePlayers() {

    const [showTeamModal, setShowTeamModal] = useState(true);
    const selectedTeam = useSelector((state: any) => state.teams.selectedTeam);
    const location: any = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("selected team ", selectedTeam);
        // selectTeamReducer({ players: [], subtitutes: [] });
        // dispatch(setPopulatedTeams([]));
    }, [])

    const handleCloseModal = () => {
        console.log("closeed selected team ", selectedTeam);
        if (selectedTeam !== null)
            setShowTeamModal(false)
    };




    return (
        <Container fluid="md">

            <Row className="d-flex">

                <Col xs={9} className="d-flex">

                <div style={{ position: 'relative', width: '100%' }}>
                    <Button
                        onClick={() => setShowTeamModal(true)}
                        variant="outlined">
                        Browse teams
                    </Button>
                    <Button
                        
                        variant="outlined"
                        style={{ position: 'absolute', right: 0  }}>
                        <Link to="/dashboard">    Exit <KTIcon iconName='' className='fs-3' /> </Link>
                    </Button>
                    </div>
                    <TeamModal open={showTeamModal} handleClose={handleCloseModal} />
                </Col>


            </Row>
            <Row>
                <Col>
                    <Team teamsFromParent={location?.state?.teams} playersPerTeam={location?.state?.PlayerPerTeam} />
                </Col>
            </Row>


        </Container >
    )

}

export default ManagePlayers;