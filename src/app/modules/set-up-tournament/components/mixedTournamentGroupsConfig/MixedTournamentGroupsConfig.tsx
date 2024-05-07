
import { ListsWidget3, TablesWidget10, MixedMatchesTable } from "../../../../../_metronic/partials/widgets";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../auth";
import { useState, useEffect } from "react";
import axios from "axios";
import { container } from "webpack";
import "./MixedTournamentGroupsConfig.css";
import { toAbsoluteUrl } from "../../../../../_metronic/helpers";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { cp } from "fs";
import { addStage } from "../../../../../services/StageService";
import { addGroup } from "../../../../../services/GroupService";
import { useNavigate } from 'react-router-dom';


interface Team {
    _id: string;
    name: string;
    logo: string;
    location: string;
    division: string;
}




const MixedTournamentGroupsConfig = () => {

    const { id } = useParams();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [teams, setTeams] = useState<Team[]>([]);
    const [unselectedTeams, setUnselectedTeams] = useState<Team[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);

    const [groups, setGroups] = useState<any[]>([]);

    const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (groupIndex) => {
        setSelectedTeams([]);
        setSelectedGroupIndex(groupIndex);
        setShow(true);
    };

    const verifyGroups = () => {
        let verified = true;
        groups.forEach(group => {
            if (group.length !== 4) {
                verified = false;
            }
        });
        return verified;
    }


    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }


    const fetchTeams = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/division/division/teams/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth?.api_token}`
                }
            });

            console.log("response ", response.data);
            for (let i = 0, j = 0; i < response.data.length / 4; i++) {
                groups.push([]);
                // for (; j < (i + 1) * 4 && j < response.data.length; j++) {
                //     groups[i].push(response.data[j])
                // }
            }
            console.log("groups ", groups);

            setTeams(response.data);
            setUnselectedTeams(response.data);

        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    useEffect(() => {
        console.log(id);
        fetchTeams();
    }, []);


    useEffect(() => {
        if (selectedTeams.length === 4 && groups[selectedGroupIndex].length === 0) {
            console.log("here baby ", selectedTeams);
            let newUnselectedTeams = [...unselectedTeams];
            selectedTeams.forEach(selectedTeam => {
                return newUnselectedTeams = newUnselectedTeams.filter(unselectedTeam => unselectedTeam !== selectedTeam);
            });
            setUnselectedTeams(newUnselectedTeams);
            const newGroups = [...groups];
            newGroups[selectedGroupIndex] = selectedTeams;
            setGroups(newGroups);
            setSelectedTeams([]);
        }
    }, [selectedTeams]);

    const teamLogoStyle = {
        height: '100px',
    }

    // const getAvailableTeams = (teamKey: string) => {
    //     return teams.filter(team => !Object.values(selectedTeams).some(selectedTeam => selectedTeam._id === team._id && selectedTeam !== selectedTeams[teamKey]));
    // }

    const containerStyle = {

        backgroundColor: '#1474b4',

    }

    const sideStyle = {

        backgroundColor: '#072940',

    }

    function handleSelectTeam(team: Team) {
        setSelectedTeams([...selectedTeams, team]);
    }

    const handleReset = (groupIndex) => {
        const newGroups = [...groups];
        setUnselectedTeams([...newGroups[groupIndex], ...unselectedTeams]);
        newGroups[groupIndex] = [];
        setGroups(newGroups);
    }


    // const handleAddGroups = async () => {
    //     groups.map(async (teams, index) => {
    //         try {
    //             await addStage({
    //                 name: String.fromCharCode(65 + index),
    //                 teams: teams,
    //                 division: id
    //             }, id!.toString());
    //         } catch (error) {
    //             console.error('Error adding group:', error);
    //         }
    //     });
    // }

    const handleAddGroups = async () => {


        const response = await addStage({
            division: id,
            number: 0,
            finished: false,
            groups: []
        }, id!.toString())
        const stage = response.data;
        console.log("added stage ", stage);


        groups.map(async (teams, index) => {
            try {
                await addGroup({
                    name: String.fromCharCode(65 + index),
                    teams: teams,
                    stage: stage._id
                }, stage._id);
            } catch (error) {
                console.error('Error adding group:', error);
            }
        });
        navigate(-1);
    }



    return (

        <>

            <div className="container">
                <div className="row d-flex justify-content-center m-5 pb-3">
                    <div className="col-auto">
                        <h1 className="text-center">Manage Groups</h1>
                    </div>
                </div>


                <div className="row d-flex justify-content-around h-100 my-5">

                    {groups.map((group, index) => (
                        <div
                            key={index}
                            className="col-12 col-lg-5 border border-primary rounded me-2 glass position-relative">



                            <div className="position-absolute end-0 m-3">

                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleShow(index)}>
                                    <i className="fas fa-plus"></i>
                                </button>

                                <button
                                    className="btn btn-primary m-3"
                                    onClick={() => handleReset(index)}
                                >
                                    <i className="fas fa-sync"></i>
                                </button>
                            </div>

                            <div className="container-fluid h-100">
                                <div className="row h-100">
                                    <div style={sideStyle} className="col-2 d-flex h-100 align-items-center justify-content-center">
                                        <h1 className="text-white">{String.fromCharCode(65 + index)}</h1>
                                    </div>
                                    <div className="col-10 my-5">
                                        {group.length > 0 ? (
                                            <>
                                                {group.map((team: Team, index) => (
                                                    <>
                                                        <div
                                                            key={index}
                                                            className="row align-items-center">
                                                            <div className="col-auto">
                                                                <img
                                                                    src={`${process.env.REACT_APP_API_URL}/${team?.logo.replace('\\', '/')}`}
                                                                    className="img-fluid"
                                                                    style={teamLogoStyle}
                                                                />
                                                            </div>
                                                            <div className="col-auto align-self-center">
                                                                <h1>name: {team?.name}</h1>
                                                            </div>
                                                        </div>
                                                        {index != 3 && <hr className="w-100" />}
                                                    </>
                                                ))}
                                            </>
                                        ) : (
                                            <>
                                                {[1, 2, 3, 4].map((team, index) => (
                                                    <>
                                                        <div
                                                            key={index}
                                                            className="row align-items-center">
                                                            <div className="col-auto">
                                                                <img
                                                                    src={toAbsoluteUrl('/media/avatars/blankTeam.png')}
                                                                    className="img-fluid"
                                                                    style={teamLogoStyle}
                                                                />
                                                            </div>
                                                            <div className="col-auto align-self-center">
                                                                <h1>name: #</h1>
                                                            </div>
                                                        </div>
                                                        {index != 3 && <hr className="w-100" />}
                                                    </>
                                                ))}
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row d-flex justify-content-center">
                    <div
                        onClick={handleAddGroups}
                        style={{
                            backgroundColor: '#072940'
                        }}
                        className={`btn col-2 m-5 ${verifyGroups() ? '' : 'disabled'}`}>
                        <h3 className="text-white">
                            <i className="fas fa-arrow-right fa-3x me-4" style={{
                                fontSize: '1.5rem'
                            }}></i>
                            Next
                        </h3>
                    </div>
                </div>


            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Configure Teams</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="form-control mb-3"
                    />

                    {unselectedTeams.filter((team: Team) => {
                        if (searchTerm === "") {
                            return team;
                        } else if (team?.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return team;
                        }
                        return null;
                    }).map((team: Team, index) => (
                        <div
                            key={index}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: selectedTeams.includes(team) ? '#f0f0f0' : 'white'
                            }}
                            onClick={() => handleSelectTeam(team)}
                            className="row align-items-center">
                            <div className="col-auto">
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/${team?.logo.replace('\\', '/')}`}
                                    className="img-fluid"
                                    style={teamLogoStyle}
                                />
                            </div>
                            <div className="col-auto align-self-center">
                                <h1>name: {team?.name}</h1>
                            </div>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>

    );
}
export default MixedTournamentGroupsConfig;


