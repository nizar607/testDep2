
import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Cancel from '@mui/icons-material/Cancel';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { useNavigate } from 'react-router-dom';
import { deletePlayer } from '../../../../services/PlayerService';

import { setSubtitutes } from "../../../../redux/slices/subtitutesSlice";
import { useSelector } from 'react-redux';

import { selectSubtitute } from "../../../../redux/slices/subtitutesSlice";
import { useAppDispatch } from '../../../../redux/hooks/UseAppDispatch';
import Player from '../../../../models/Player';
import { selectTeamReducer } from '../../../../redux/slices/teamsSlice';
import { setPopulatedTeams } from '../../../../redux/slices/teamsSlice';
import { useEffect } from 'react';
import { updateTeam } from '../../../../services/TeamService';
import { useState } from 'react';




function PlayerCard({ player }) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const selectedTeam = useSelector((state: any) => state.teams.selectedTeam);
    const teams = useSelector((state: any) => state.teams.teams);
    const open = Boolean(anchorEl);
    const [currentPlayer, setCurrentPlayer] = React.useState(null);
    const subtitutes = useSelector((state: any) => state.subtitutes.subtitutes);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [newIndex, setNewIndex] = useState(-27);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        console.log("close")
        setAnchorEl(null);
    };



    // useEffect(() => {

    //     console.log("selected team ", selectedTeam);
    //     console.log("all teams ", teams);
    //     const teamsCopy = [...teams];

    //     teamsCopy[teamsCopy.findIndex(team => team.name === selectedTeam?.name)] = selectedTeam;
    //     console.log("teams copy ", teamsCopy);
    //     if (teamsCopy.length > 0) {
    //         dispatch(setPopulatedTeams(teamsCopy));
    //         handleConfirmTeam();
    //     }
    // }, [selectedTeam]);





    async function handleConfirmTeam() {
        const teamToConfirm = { ...selectedTeam };

        teamToConfirm.players = teamToConfirm.players.filter((player) => !player.blank);
        teamToConfirm.subtitutes = teamToConfirm.subtitutes.filter((player) => !player.blank);
        console.log("team to confirm ", teamToConfirm);
        const response = await updateTeam(teamToConfirm._id, { subtitutes: teamToConfirm.subtitutes, players: teamToConfirm.players });
        console.log("response ", response.data);
    }

    const handleRemove = async () => {
        console.log("Player to remove: ", player);

        const playersCopy = [...selectedTeam.players]
        const subtitutesCopy = [...selectedTeam.subtitutes]

        // Find a blank player in subtitutes
        const blankPlayerIndex = subtitutesCopy.findIndex((subPlayer) => subPlayer.blank === true);

        // If a blank player is found, swap it with the selected player
        if (blankPlayerIndex !== -1) {
            const blankPlayer = subtitutesCopy[blankPlayerIndex];
            console.log("Blank player from substitutes: ", blankPlayer);

            subtitutesCopy[blankPlayerIndex] = player;

            const playerIndex = playersCopy.findIndex((playerToRemove) => playerToRemove === player);
            console.log("Index of player to remove in players: ", playerIndex);

            playersCopy[playerIndex] = blankPlayer;

            console.log("team after remove ddddd", { ...selectedTeam, subtitutes: sortSubtitutes(subtitutesCopy), players: playersCopy });

            const updatedTeam = {
                ...selectedTeam,
                subtitutes: sortSubtitutes(subtitutesCopy),
                players: playersCopy
            };

            setTimeout(() => {
                dispatch(selectTeamReducer(updatedTeam));

                const teamsCopy = [...teams];
                teamsCopy[teamsCopy.findIndex(team => team.name === updatedTeam.name)] = updatedTeam;
                dispatch(setPopulatedTeams(teamsCopy));
            }, 100);
        } else {
            console.log("No blank player found in subtitutes");
        }
    }


    const sortSubtitutes = (subtitutes) => {
        return subtitutes.sort((a, b) => {
            if (a.playerNumber > 0 && b.playerNumber < 0) {
                return -1;
            } else if (a.playerNumber < 0 && b.playerNumber > 0) {
                return 1;
            } else {
                return 0;
            }
        });
    }





    const handleEditClick = (player: any) => {
        setCurrentPlayer(player);
        dispatch(selectSubtitute(player));
        navigate('/editPlayer', { state: { player } });
    };


    const handleDelete = async (id: string) => {
        deletePlayer(id);

        const playersCopy = [...selectedTeam.players];
        const subtitutesCopy = [...selectedTeam.subtitutes];

        // Find a blank player in subtitutes
        const blankPlayerIndex = subtitutesCopy.findIndex((subPlayer) => subPlayer.blank === true);

        // If a blank player is found, swap it with the deleted player
        if (blankPlayerIndex !== -1) {
            const blankPlayer = subtitutesCopy[blankPlayerIndex];

            // Replace the deleted player with the blank player in players
            const playersAfterDelete = playersCopy.map((player: Player) => player._id === id ? blankPlayer : player);

            // Remove the deleted player from subtitutes
            const subtitutesAfterDelete = subtitutesCopy.filter((player: Player) => player._id !== id);

            // Remove the blank player from subtitutes
            const subtitutesAfterRemoveBlank = subtitutesAfterDelete.filter((player: Player) => player._id !== blankPlayer._id);

            const updatedTeam = {
                ...selectedTeam,
                players: playersAfterDelete,
                subtitutes: sortSubtitutes(subtitutesAfterRemoveBlank)
            };

            setTimeout(() => {
                dispatch(selectTeamReducer(updatedTeam));

                const teamsCopy = [...teams];
                teamsCopy[teamsCopy.findIndex(team => team.name === updatedTeam.name)] = updatedTeam;
                dispatch(setPopulatedTeams(teamsCopy));
            }, 100);
        } else {
            console.log("No blank player found in subtitutes");
        }
    };







    return (

        <>

            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem
                    onMouseDown={(event) => {
                        event.preventDefault();
                        handleClose()
                        handleEditClick(player)
                    }}>
                    <ListItemIcon>
                        <DriveFileRenameOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>



                <MenuItem onMouseDown={handleRemove}>
                    <ListItemIcon>
                        <GroupRemoveIcon fontSize="small" />
                    </ListItemIcon>

                    <ListItemText>Remove</ListItemText>

                </MenuItem>

                <MenuItem onMouseDown={() => handleDelete(player._id)}>
                    <ListItemIcon>
                        <DeleteForeverIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>

                <Divider />

                <MenuItem onMouseDown={handleClose}>
                    <ListItemIcon>
                        <Cancel fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cancel</ListItemText>
                </MenuItem>
            </Menu>
            <div
                className="container text-white player-card"
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onContextMenu={(event) => {
                    event.preventDefault();
                    handleClick(event);
                }}

                style={{
                    height: "fit-content",
                }}>
                <div className="row">
                    <div className="col-4">

                        <div>
                            <img className="img-fluid" src={`https://flagsapi.com/${player.country}/flat/64.png`} alt="country Flag" />
                        </div>
                        <div>
                            <img className="img-fluid" src={`${process.env.REACT_APP_API_URL}/${selectedTeam.logo.replace('\\', '/')}`} alt="Barcelona Logo" />
                        </div>
                    </div>
                    <div className="col-8">
                        <img className="img-fluid" src={`${process.env.REACT_APP_API_URL}/${player.avatar.replace('\\', '/')}`} alt="Messi" draggable="false" />

                        {/* <img className="img-fluid" src="https://selimdoyranli.com/cdn/fut-player-card/img/barcelona.svg" alt="Barcelona Logo" /> */}
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
    )
}

export default PlayerCard;