import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { useSelector } from 'react-redux';
import { selectTeam, setPopulatedTeams, useAppDispatch } from '../../../../redux/slices/teamsSlice';
import { useEffect } from 'react';





const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});




export default function TeamModal(props) {

    const selectedTeam = useSelector((state: any) => state.teams.selectedTeam);
    const teams = useSelector((state: any) => state.teams.teams);

    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("selected team from team modal ", selectedTeam);
    }, [selectTeam])

    const handleSelectTeam = async (team) => {
        let data: any = [];
        let data2: any = [];
        console.log("team selected ", team);
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

        for (let i = 28; i < 88; i++) {
            data2.push({
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

        team?.players?.map((player) => {
            if (!player.blank) {
                data[player.position] = player;
            }
        })

        let updatedTeam = { ...team };

        if (team.players.length < 26) {
            updatedTeam.subtitutes = team.subtitutes.concat(data2);
            updatedTeam.players = data;
        } else if (team.players.length > 0) {
            if (team.subtitutes.length <= 20) {
                updatedTeam.subtitutes = team.subtitutes.concat(data2);
            }
        } else {
            updatedTeam.players = data;
            updatedTeam.subtitutes = team.subtitutes.concat(data2);
        }

        await dispatch(selectTeam(updatedTeam));
        
    }

    // const fetchTeams = async () => {
    //     const response = await getTeams();
    //     const teams = response.data;
    //     dispatch(setPopulatedTeams(teams));
    //     console.log("debug teams here ", teams);
    //     console.log("debug selected team here ", selectedTeam);
    // };





    const modalStyle = {
        border: "#0ddc14 solid 2px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    }

    if (!teams) {
        return <div>Loading...</div>
    }
    return (

        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Choose a team to setup players</DialogTitle>
            <DialogContent>
                {teams?.map((option: any, index) => (

                    <Card
                        style={selectedTeam == option ? modalStyle : {}}
                        role="button"
                        onClick={() => handleSelectTeam(option)}
                        key={index}
                        className="pe-auto my-3">
                        <CardHeader
                            title={"Team name: " + option.name}
                            subheader={"Location: " + option.location}
                        />

                        <div className="d-flex justify-content-center align-items-center">
                            <img className="img-fluid mx-auto team-image" src={`${process.env.REACT_APP_API_URL}/${option.logo.replace('\\', '/')}`} alt="team image" style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover"
                            }} />
                        </div>
                    </Card>

                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Close</Button>
            </DialogActions>
        </Dialog >
    );
}