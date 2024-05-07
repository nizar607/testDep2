import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../auth";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { toAbsoluteUrl } from "../../../../../_metronic/helpers";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface Team {
    _id: string;
    name: string;
    logo: string;
    location: string;
    division: string;
}

interface Match {
    _id: string;
    // Assuming additional properties that define a match
}





const MatchConfig = () => {
    const { id } = useParams();
    const { auth } = useAuth();
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<{ team1?: Team, team2?: Team }>({});
    const [numberTeams, setNumberTeams] = useState<number>(0);
    const [tournament, setTournament] = useState<any>({}); // Assuming you have a tournament object with the required properties
    const navigate = useNavigate();


   
    

    const numberOfMatches = Math.floor(numberTeams / 2);

    // match form schema 
    const schema = Yup.object().shape({
        matches: Yup.array()
            .of(
                Yup.object().shape({
                    team1: Yup.string().required('Team 1 is required'),
                    team2: Yup.string().required('Team 2 is required'),
                    time: Yup.date()
                        .required('Match time is required')
                        .test(
                            'is-within-range',
                            'Matchtime must be betwwen tournament start and end dates',
                            function(value) {
                                const { tournamentStartDate, tournamentEndDate } = tournament;
                                if (!tournamentStartDate || !tournamentEndDate) {
                                    return this.createError({ message: "Tournament dates not set" });
                                }
                                return value >= new Date(tournamentStartDate) && value <= new Date(tournamentEndDate);
                            }
                        )
                })
            )
            .min(numberOfMatches, `At least ${numberOfMatches} matches are required`)
            .required('Matches are required')
    });

    const initialValues = {
        matches: Array(numberOfMatches).fill({ team1: undefined, team2: undefined, time: '' })
    };

    const handleSubmit = async (values: any) => {

        const toastId = toast("Waiting...", { autoClose: false });

        const matches = values.matches.map((match: any, index: number) => {
            return {
                team1: selectedTeams[`team1-${index}`]._id,
                team2: selectedTeams[`team2-${index}`]._id,
                time: match.time,
                division: id
            };

        });

        console.log('Matches:', matches);
        try {

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/match/addMatches`, { matches }, {
                headers: {
                    Authorization: `Bearer ${auth?.api_token}`
                }
            });
            toast.update(toastId, {
                render: "Almost there! Finalizing your tournament details...",
                type: 'success',
                autoClose: 3000,
                onClose: () => navigate('/dashboard') // replace '/your-next-page' with the path to your next page
            });
            console.log('Matches created:', response.data);
        } catch (error) {
            console.error('Error creating matches:', error);
            toast.update(toastId, {
                render: "Error creating matches",
                type: 'error',
                autoClose: 3000,
                onClose: () => navigate('/error-page') // replace '/error-page' with the path to your error page
            });
        }
    }




    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/division/poptournament/division/teams/${id}`, {
                    headers: {
                        Authorization: `Bearer ${auth?.api_token}`
                    }
                });
                console.log('populating tournament',response.data)
                setTournament(response.data.tournament);  
                //console.log('tournament date',tournament)
                setTeams(response.data.teams);
                setNumberTeams(response.data.teams.length);


            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, [auth?.api_token, id]);

    console.log(numberTeams)

    const handleSelectTeam = (team: Team, teamKey: string) => {
        setSelectedTeams(prevState => ({ ...prevState, [teamKey]: team }));
    }



    const getAvailableTeams = (teamKey: string) => {
        return teams.filter(team => !Object.values(selectedTeams).some(selectedTeam => selectedTeam._id === team._id && selectedTeam !== selectedTeams[teamKey]));
    }


    const [open, setOpen] = useState(false);
    const [formDetails, setFormDetails] = useState({ email: '', password: '' });

    // Fonctions pour ouvrir et fermer la popup
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
    };

    const [selectedMatchId, setSelectedMatchId] = useState(null);




    const handleAddDetail = async () => {
        const apiUrl = 'http://localhost:3001/user/registerAgent';

        try {
            const response = await axios.post(apiUrl, {
                email: formDetails.email,
                password: formDetails.password,

            }, {
                headers: {
                    Authorization: `Bearer ${auth?.api_token}`, // Assuming your auth token is required and available
                }
            });

            console.log('Agent registered successfully:', response.data);
            alert('Agent registered successfully');
            setFormDetails({ email: '', password: '' }); // Reset form details
            setOpen(false); // Close the dialog
        } catch (error) {
            console.error('Error registering agent:', error);
            alert('Error registering agent. Please try again.');
        }
    };


    return (
        <div>
            <ToastContainer />
            {/** header */}
            <div className="position-relative">
                <img
                    src={toAbsoluteUrl('/media/custom icon/soccer-header.jpg')}
                    className='w-100'
                    alt=''
                    style={{
                        height: '15%', // Adjust as needed
                        objectFit: 'cover'
                    }}
                />
                <h3 className="position-absolute top-50 start-50 translate-middle card-title fw-bolder text-white" style={{
                    fontSize: '4em', // Make the text bigger
                    color: '#ff0000', // Change the text color
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' // Add a text shadow
                }}>Match Configuration</h3>
            </div>





            <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
                {({ values, setFieldValue, errors }) => (
                    <Form>
                        {[...Array(numberOfMatches)].map((_, matchIndex) => (
                            <div key={matchIndex} className="card mt-9 " style={{ backgroundColor: 'white' }}>
                                <div className="card-body" style={{
                                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)', // Adjust as needed
                                    borderRadius: '10px', // Adjust as needed
                                }}>

                                    <div key={matchIndex}>
                                        <div className="row align-items-center">
                                            <div className="col-md-5" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                                                <Autocomplete

                                                    id={`combo-box-demo-${matchIndex}-1`}
                                                    options={getAvailableTeams(`team1-${matchIndex}`)}
                                                    getOptionLabel={(option) => option.name}
                                                    style={{ width: '90%' }}
                                                    renderInput={(params) => <TextField {...params} label="Select a Team" variant="outlined" />}
                                                    renderOption={(props, option) => (
                                                        <li {...props}>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <img src={`${process.env.REACT_APP_API_URL}/${option.logo.replace(/\\/g, '/')}`} alt={option.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                                                                <div>
                                                                    <div>{option.name}</div>
                                                                    <div style={{ fontSize: '0.8em', color: '#888' }}>{option.location}</div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )}
                                                    onChange={(event, newValue) => {
                                                        if (newValue) {
                                                            handleSelectTeam(newValue, `team1-${matchIndex}`);
                                                            setFieldValue(`matches[${matchIndex}].team1`, newValue._id);
                                                        }
                                                    }}
                                                    className="ms-9"
                                                />
                                                {errors.matches && errors.matches[matchIndex] && (errors.matches[matchIndex] as any).team1 && (
                                                    <div className="text-danger">{(errors.matches[matchIndex] as any).team1}</div>
                                                )}
                                                <br />
                                                {selectedTeams[`team1-${matchIndex}`] && (
                                                    <div className="card ms-15" style={{
                                                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)', // Adjust as needed
                                                        borderRadius: '10px', // Adjust as needed
                                                        width: '80%', // Adjust as needed
                                                        padding: '20px', // Adjust as needed
                                                    }} >
                                                        <div className="text-center">
                                                            <img src={`${process.env.REACT_APP_API_URL}/${selectedTeams[`team1-${matchIndex}`].logo}`} alt={selectedTeams[`team1-${matchIndex}`].name} className="img-fluid mb-3 rounded-circle" style={{ width: '100px', height: '100px' }} />
                                                            <strong> <p className="mb-0">{selectedTeams[`team1-${matchIndex}`].name}</p> </strong>
                                                            <p className="text-muted">{selectedTeams[`team1-${matchIndex}`].location}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-md-2">

                                                <h2 className="text-center" style={{ color: '#6c757d' }}>VS</h2>
                                                <div className="mt-3">

                                                    <Field
                                                        type="datetime-local"
                                                        className="form-control"
                                                        name={`matches[${matchIndex}].time`}
                                                        value={values.matches[matchIndex]?.time || ''}
                                                        onChange={(e) => setFieldValue(`matches[${matchIndex}].time`, e.target.value)}
                                                    />
                                                    <ErrorMessage name={`matches[${matchIndex}].time`} component="div" className=" text-danger ms-3" />
                                                </div>
                                            </div>
                                            <div className="col-md-5" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                                                <Autocomplete
                                                    id={`combo-box-demo-${matchIndex}-2`}
                                                    options={getAvailableTeams(`team2-${matchIndex}`)}
                                                    getOptionLabel={(option) => option.name}
                                                    style={{ width: '90%' }}
                                                    renderInput={(params) => <TextField {...params} label="Select a Team" variant="outlined" />}
                                                    renderOption={(props, option) => (
                                                        <li {...props}>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <img src={`${process.env.REACT_APP_API_URL}/${option.logo.replace(/\\/g, '/')}`} alt={option.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                                                                <div>
                                                                    <div>{option.name}</div>
                                                                    <div style={{ fontSize: '0.8em', color: '#888' }}>{option.location}</div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )}
                                                    onChange={(event, newValue) => {
                                                        if (newValue) {
                                                            handleSelectTeam(newValue, `team2-${matchIndex}`);
                                                            setFieldValue(`matches[${matchIndex}].team2`, newValue._id);
                                                        }
                                                    }}
                                                    className="ms-9"
                                                />
                                                {errors.matches && errors.matches[matchIndex] && (errors.matches[matchIndex] as any).team2 && (
                                                    <div className="text-danger">{(errors.matches[matchIndex] as any).team2}</div>
                                                )}
                                                <br />
                                                {selectedTeams[`team2-${matchIndex}`] && (
                                                    <div className="card ms-15" style={{
                                                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)', // Adjust as needed
                                                        borderRadius: '10px', // Adjust as needed
                                                        width: '80%', // Adjust as needed
                                                        padding: '20px', // Adjust as needed
                                                    }} >
                                                        <div className="text-center">

                                                            <img src={`${process.env.REACT_APP_API_URL}/${selectedTeams[`team2-${matchIndex}`].logo}`} alt={selectedTeams[`team2-${matchIndex}`].name} className="img-fluid mb-3 rounded-circle" style={{ width: '100px', height: '100px' }} />

                                                            <strong><p className="mb-0">{selectedTeams[`team2-${matchIndex}`].name}</p></strong>
                                                            <p className="text-muted">{selectedTeams[`team2-${matchIndex}`].location}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                        </div>

                                    </div>
                                    <div>


                                        <div>

                                            


                                            {/* Dialog for adding an agent */}
                                            <Dialog open={open} onClose={handleClose}>
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


                                    </div>

                                </div>






                            </div>
                        ))}
                        <br />

                        <div className="text-end">
                            <button className="btn btn-primary me-5" type="submit">Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>

        </div>
    );
}
export default MatchConfig;