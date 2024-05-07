import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '../../../auth';
import { useParams } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { match } from 'assert';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { toAbsoluteUrl } from "../../../../../_metronic/helpers";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



const Championship = () => {
    const { id } = useParams();
    const [teams, setTeams] = useState<any>([]);
    const { auth } = useAuth();

    interface Team {
        _id: string;
        name: string;
        logo: string;
        location: string;
        division: string;
    }

    const [journeys, setJourneys] = useState(3);
    const [matches, setMatches] = useState(2);
    const [selectedTeams, setSelectedTeams] = useState<{ team1?: Team, team2?: Team }>({});
    const [initialValues, setInitialValues] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [formDetails, setFormDetails] = useState({ email: '', password: '' });


    const fetchTeams = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/division/division/teams/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth?.api_token}`
                }
            });
            console.log('Équipes récupérées:', response.data[0]);
            setTeams(response.data);
            const initialMatches: any = [];

            for (let i = 0; i < response.data.length; i++) {
                for (let j = i + 1; j < response.data.length; j++) {
                    const match = {
                        team1: response.data[i]._id,
                        team2: response.data[j]._id,
                        division: id,
                        team1Logo: response.data[i].logo,
                        team2Logo: response.data[j].logo,
                        name1: response.data[i].name,
                        name2: response.data[j].name,
                        location1: response.data[i].location,
                        location2: response.data[j].location,

                    };
                    initialMatches.push(match);
                }
            }




            setInitialValues({
                matches: initialMatches,
            })


            console.log(initialMatches)
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des équipes :', error);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    useEffect(() => {

        setJourneys(teams.length - 1);
        setMatches(Math.floor(teams.length / 2));
    }, [teams]);



    useEffect(() => {
        console.log("initialValues", initialValues);
    }, [initialValues]);


    const handleAddDetail = async () => {
        const apiUrl = 'http://localhost:3001/user/registerAgent';
        try {
            const response = await axios.post(apiUrl, {
                email: formDetails.email,
                password: formDetails.password,
            }, {
                headers: {
                    Authorization: `Bearer ${auth?.api_token}`
                }
            });
            console.log('Agent registered successfully:', response.data);
            alert('Agent registered successfully');
            setFormDetails({ email: '', password: '' });
            setOpen(false);
        } catch (error) {
            console.error('Error registering agent:', error);
            alert('Error registering agent. Please try again.');
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
    };

    const validationSchema = Yup.object().shape({
        matches: Yup.array().of(
            Yup.object().shape({
                team1: Yup.string().required('Team 1 is required'),
                team2: Yup.string().required('Team 2 is required'),
                time: Yup.date().required('Match time is required'),
                division: Yup.string().required('Division is required'),
            })
        ).required(`Matches are required`),
    });
    
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        const toastId = toast("Waiting...", { autoClose: false });
    
        console.log('Form values:', values);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/match/add-matches/${id}`, values.matches, {
                headers: {
                    Authorization: `Bearer ${auth?.api_token}`
                }
            });

            toast.update(toastId, {
                render: "Almost there! Finalizing your tournament match details...",
                type: 'success',
                autoClose: 2000,
                onClose: () => navigate('/setuptournament/mytournaments') // replace '/your-next-page' with the path to your next page
            });

            console.log("matches added ", response);
        } catch (error) {
            console.error('Error adding matches:', error);
            toast.update(toastId, { render: "Error adding matches", type: "error", autoClose: 2000 });
        }
    };





    function getAvailableTeams1(values, team1, team2, matchIndex) {
        const playedMatches = values.matches
            .slice(0, matchIndex)
            .filter(match => match.team1 && match.team2);

        let availableTeams = teams;

        if (team2 !== "") {
            const matchesWithTeam2 = playedMatches.filter(match => match.team1 === team2 || match.team2 === team2);

            const teamsPlayedWithTeam2 = matchesWithTeam2.flatMap(match => [match.team1, match.team2]);
            console.log("teamsPlayedWithTeam2 ", teamsPlayedWithTeam2)
            availableTeams = teams.filter(team => !teamsPlayedWithTeam2.includes(team._id));
        }

        return availableTeams;
    }
    function getAvailableTeams2(values, team1, team2, matchIndex) {
        const playedMatches = values.matches
            .slice(0, matchIndex)
            .filter(match => match.team1 && match.team2);

        return teams;
    }

    const handleSelectTeam = (team: Team, teamKey: string) => {
        setSelectedTeams(prevState => ({ ...prevState, [teamKey]: team }));
    };

    if (loading) {
        return <div>Loading...</div>;  // Render a loading message while fetching teams data
    }



    return (
        <div>
            <ToastContainer />
            {/* Header */}
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

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, errors }) => (
                    <Form>

                        {/* <button
                            onClick={() => console.log('Form values:', values)}
                        >
                            show me
                        </button> */}

                        {values?.matches?.map((match: any, matchIndex: number) => (
                            <div key={matchIndex}>

                                <div key={matchIndex} className="mb-5">
                                    <div key={matchIndex} className="card mt-5" style={{ backgroundColor: '#f8f9fa', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '16px' }}>
                                        <div className="card-body p-5">
                                            <div className="row align-items-center">

                                                {/* Select Team 1 */}
                                                <div className="col-md-5">


                                                    <div className="card mt-3" style={{ backgroundColor: '#ffffff', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px', padding: '24px' }}>
                                                        <div className="text-center">
                                                            <img src={`${process.env.REACT_APP_API_URL}/${match.team1Logo?.replace(/\\/g, '/')}`} alt={match.name} className="img-fluid mb-3 rounded-circle" style={{ width: '80px', height: '80px' }} />
                                                            <h5 className="mb-1">{match.name1}</h5>
                                                            <p className="text-muted mb-0">{match.location1}</p>
                                                        </div>
                                                    </div>



                                                    {selectedTeams[`team1-${matchIndex}`] && (
                                                        <div className="card mt-3" style={{ backgroundColor: '#ffffff', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px', padding: '24px' }}>
                                                            <div className="text-center">
                                                                <img src={`${process.env.REACT_APP_API_URL}/${selectedTeams[`team1-${matchIndex}`].logo}`} alt={selectedTeams[`team1-${matchIndex}`].name} className="img-fluid mb-3 rounded-circle" style={{ width: '80px', height: '80px' }} />
                                                                <h5 className="mb-1">{selectedTeams[`team1-${matchIndex}`].name}</h5>
                                                                <p className="text-muted mb-0">{selectedTeams[`team1-${matchIndex}`].location}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                {/* VS */}
                                                <div className="col-md-2">
                                                    <h3 className="text-center" style={{ color: '#6c757d' }}>VS</h3>
                                                    <div className="mt-4">
                                                        {/* Match time input */}
                                                        <Field
                                                            type="datetime-local"
                                                            className="form-control"
                                                            name={`matches[${matchIndex}].time`}
                                                            value={values.matches[matchIndex].time || ''}
                                                            onChange={(e) => setFieldValue(`matches[${matchIndex}].time`, e.target.value)}
                                                        />
                                                        <ErrorMessage name={`matches[${matchIndex}].time`} component="div" className="text-danger mt-2" />
                                                    </div>
                                                </div>
                                                {/* Select Team 2 */}
                                                <div className="col-md-5">
                                                    {console.log('Team2:', values?.matches[matchIndex]?.team2)}

                                                    <div className="card mt-3" style={{ backgroundColor: '#ffffff', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px', padding: '24px' }}>
                                                        <div className="text-center">
                                                            <img src={`${process.env.REACT_APP_API_URL}/${match.team2Logo?.replace(/\\/g, '/')}`} alt={match.name} className="img-fluid mb-3 rounded-circle" style={{ width: '80px', height: '80px' }} />
                                                            <h5 className="mb-1">{match.name2}</h5>
                                                            <p className="text-muted mb-0">{match.location2}</p>
                                                        </div>
                                                    </div>

                                                    {selectedTeams[`team2-${matchIndex}`] && (
                                                        <div className="card mt-3" style={{ backgroundColor: '#ffffff', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px', padding: '24px' }}>
                                                            <div className="text-center">
                                                                <img src={`${process.env.REACT_APP_API_URL}/${selectedTeams[`team2-${matchIndex}`].logo}`} alt={selectedTeams[`team2-${matchIndex}`].name} className="img-fluid mb-3 rounded-circle" style={{ width: '80px', height: '80px' }} />
                                                                <h5 className="mb-1">{selectedTeams[`team2-${matchIndex}`].name}</h5>
                                                                <p className="text-muted mb-0">{selectedTeams[`team2-${matchIndex}`].location}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <br />
                        <div className="text-end">
                            <button className="btn btn-primary px-4 py-2" type="submit">Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>


            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Ajouter un Agent</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" id="email" label="Email" type="email" name="email" fullWidth variant="outlined" value={formDetails.email} onChange={handleChange} />
                    <TextField margin="dense" id="password" label="Mot de passe" type="password" name="                    password" fullWidth variant="outlined" value={formDetails.password} onChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleAddDetail}>Ajouter Agent</Button>
                </DialogActions>
            </Dialog>

        </div >
    );
};

export default Championship;