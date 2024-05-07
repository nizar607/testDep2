import React from 'react';
import TeamCard from './TeamCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../../../app/modules/auth';
import { KTIcon } from '../../../helpers';
import { time } from 'console';

const MatchComponent = ({ match }) => {

    const [selectedMatchId, setSelectedMatchId] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [open, setOpen] = useState(false);
    const [timeId, setTimeId] = useState(null);
    const [openTime, setOpenTime] = useState(false);
    const [formDetails, setFormDetails] = useState({ email: '', password: '' });
    const { auth } = useAuth();

    // Determine the match outcome for each team
    const team1Outcome = match.winner && match.team1 && match.winner === match.team1._id ? 'winner' : match.winner ? 'lost' : null;
    const team2Outcome = match.winner && match.team2 && match.winner === match.team2._id ? 'winner' : match.winner ? 'lost' : null;

    // Format the date and time
    const dateTime = match.time ? new Date(match.time) : null;
    const dateStr = dateTime ? dateTime.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'TBD';
    const timeStr = dateTime ? dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';


    //handle time change
    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    }

    const handleClickOpen = (matchId) => {
        setSelectedMatchId(matchId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenTime = async (matchId) => {
        setTimeId(matchId);
        setOpenTime(true);
      
    };

    const handleClickCloseTime = () => {
        setOpenTime(false);
    };  

    /*   const apiUrl = 'http://localhost:3001/match/addTime';

        try {
            const response = await axios.put(`${apiUrl}/${matchId}`, {
                headers: {
                    Authorization: `Bearer ${auth?.api_token}`,
                }
            });

            console.log('Time added successfully:', response.data);
            alert('Time added successfully');
        } catch (error) {
            console.error('Error adding time:', error);
            alert('Error adding time. Please try again.');
        } */

        const handleAddTime = async (matchId, time) => {
            const apiUrl = 'http://localhost:3001/match/addTime';
        
            try {
                const response = await axios.put(`${apiUrl}/${matchId}`, {time: time} ,{
                    headers: {
                        Authorization: `Bearer ${auth?.api_token}`,
                    }
                });
        
                console.log('Time added successfully:', response.data);
                alert('Time added successfully');
            } catch (error) {
                console.error('Error adding time:', error);
                alert('Error adding time. Please try again.');
            }
        };




    const handleAddDetail = async () => {
        const apiUrl = 'http://localhost:3001/user/registerAgent';

        try {
            const response = await axios.post(apiUrl, {
                email: formDetails.email,
                password: formDetails.password,
                matchId: selectedMatchId, // Include the selected match ID
            }, {
                headers: {
                    Authorization: `Bearer ${auth?.api_token}`,
                }
            });

            console.log('Agent registered successfully:', response.data);
            console.log(selectedMatchId);
            alert('Agent registered successfully');
            setFormDetails({ email: '', password: '' }); // Reset form
            setSelectedMatchId(null); // Reset selected match ID
            setOpen(false); // Close the dialog
        } catch (error) {
            console.error('Error registering agent:', error);
            alert('Error registering agent. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
    };

    return (
        <Card sx={{
            width: '100%', maxWidth: 900, margin: 'auto', mt: 2, mb: 2,
            borderWidth: 1, // Optional: You can adjust the border width
            borderStyle: 'solid', // Necessary to show the border
            borderColor: 'black', // Example: A blue color. Adjust the color code to match your design
        }}>
            <CardContent>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={5} md={4} lg={5}>
                        <TeamCard team={match.team1} matchOutcome={team1Outcome} />
                    </Grid>
                    <Grid item xs={12} sm={2} md={4} lg={2} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: { xs: 2, sm: 0 },
                        px: { xs: 1, sm: 0 } // Apply horizontal padding on xs screens to reduce side margins
                    }}>
                        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>VS</Typography>
                        <Typography sx={{ textAlign: 'center', mt: 1 }}>
                            {dateStr}
                            <br />
                            {timeStr}
                        </Typography>
                        <div style={{ margin: '20px 0' }}>
                            {/* Placeholder for match details */}


                            <button className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary' onClick={() => handleClickOpen(match._id)}>
                                <KTIcon iconName='plus' className='fs-2' />
                            </button> <br /> <br />


                            {/* if match.time is null then appear this button */ }
                            {match.time === null && 
                                    <button className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary' onClick={() => handleClickOpenTime(match._id)}>
                                        <KTIcon iconName='time' className='fs-2' />
                                    </button>
                                }

                            {/* Dialog for adding time */}
                            <Dialog
                                open={openTime}
                                onClose={handleClickCloseTime}
                                BackdropProps={{
                                    style: {
                                        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change this to adjust the color and opacity
                                    },
                                }}>
                                <DialogTitle>Add Time</DialogTitle>
                                <DialogContent>
                                    <TextField autoFocus margin="dense" id="time" label="Time" type="datetime-local" name="time" fullWidth variant="outlined" onChange={handleTimeChange}  />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClickCloseTime}>Cancel</Button>
                                    <Button onClick={() => handleAddTime(match._id , selectedTime)}>Add Time</Button>
                                </DialogActions>
                            </Dialog>



                            {/* Dialog for adding an agent */}
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                BackdropProps={{
                                    style: {
                                        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change this to adjust the color and opacity
                                    },
                                }}>
                                <DialogTitle>Add Agent</DialogTitle>
                                <DialogContent>
                                    <TextField autoFocus margin="dense" id="email" label="Email" type="email" name="email" fullWidth variant="outlined" value={formDetails.email} onChange={handleChange} />
                                    <TextField margin="dense" id="password" label="Password" type="password" name="password" fullWidth variant="outlined" value={formDetails.password} onChange={handleChange} />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleAddDetail}>Add Agent</Button>
                                </DialogActions>
                            </Dialog>

                        </div>
                    </Grid>
                    <Grid item xs={12} sm={5} md={4} lg={5}>
                        <TeamCard team={match.team2} matchOutcome={team2Outcome} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default MatchComponent;