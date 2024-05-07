
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDivisionById } from '../../../../../services/DivisionService';
import { useAuth } from '../../../../modules/auth';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Formik, Form, Field } from 'formik';
import Button from '@mui/material/Button';
import { ErrorMessage } from 'formik';
import StandingTeams from './StandingTeams';

import * as Yup from 'yup';
import { patchMatch } from '../../../../../services/MatchService';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import ParticleBg from '../ParticleBg';
import { KTIcon } from '../../../../../_metronic/helpers';

const schema = Yup.object().shape({
    time: Yup.date()
        .min(new Date().toISOString().split('T')[0], 'Date should not be earlier than today')
        .required('Time is required'),
});





const handleSubmit = (values, { setSubmitting }) => {
    // Here you can access your form values
    console.log(values);

    // Simulate an asynchronous operation
    setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
    }, 400);
};

interface Team {
    _id: string;
    name: string;
    logo: string;
    location: string;
    division: string;
}





const MatchesConfig = () => {
    const { id } = useParams();
    const [division, setDivision] = useState<any>(null);
    const [stages, setStages] = useState<any>([]);
    const { auth } = useAuth();


const [open, setOpen] = useState(false);
const [formDetails, setFormDetails] = useState({ email: '', password: '' });



const handleClickOpen = (matchId) => {
    setSelectedMatchId(matchId);
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
        matchId: selectedMatchId, 
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


    const handleSubmit = async (values, match) => {

        const response = await patchMatch({ time: values.time }, match._id);
        console.log(response.data);

    };

    const getDivision = async () => {
        if (id && auth?.api_token) {
            const response = await getDivisionById(id, auth?.api_token);
            console.log("division", response.data);
            setStages(response.data.stages);
            setDivision(response.data);
        }
    }

    useEffect(() => {
        getDivision();
    }, [])



    return (
        <>
        
        

            <>
                {stages.length == 1 &&
                    <>
                        <h1 >FIRST STAGE</h1>
                        {stages[0].groups.map((group: any, groupIndex: number) =>
                            <>
                                <div key={groupIndex} className="my-5 border border-3 p-5 rounded" style={{ backgroundColor: '#f0f2f5', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' }}>

                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <div className="row w-100">
                                                <h1 className="text-center">GROUP: {group.name}</h1>
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {
                                                group.matches.map((match: any, matchIndex: number) => {
                                                    return (
                                                        <div key={matchIndex} className="card mt-9 mx-5" style={{ backgroundColor: 'white' }}>
                                                            <div className="card-body" style={{
                                                                borderRadius: '10px', // Adjust as needed
                                                            }}>
                                                                <div key={matchIndex}>
                                                                    <div className="row align-items-center justify-content-around">
                                                                        <div className="col-12 col-md-3 team-card text-center" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)' }}>
                                                                            <h2>{match.team1.name}</h2>
                                                                            <img src={`${process.env.REACT_APP_API_URL}/${match.team1.logo.replace(/\\/g, '/')}`} alt={match.team1.name} style={{ height: '100px', marginRight: '10px' }} />
                                                                            <p>{match.team1.location}</p>
                                                                        </div>

                                                                        <div className="col-12 col-md-5 d-flex justify-content-center my-5">
                                                                            <div className="container-fluid text-center">

                                                                                <h2 className="row text-center" style={{ color: '#6c757d' }}>

                                                                                    <div className="col-auto mx-auto">
                                                                                        VS 
                                                                                    </div>

                                                                                    <div>

              <div style={{ margin: '20px 0' }}>
                {/* Placeholder for match details */}
                <Button variant="outlined" onClick={() => handleClickOpen(match._id)}>
                  Add Agent to Match
                </Button>

              </div>


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

                                                                                </h2>

                                                                                <div className="row">
                                                                                    {match?.time ?
                                                                                        <h3>{new Date(match.time).toLocaleString()}</h3> :
                                                                                        <Formik
                                                                                            initialValues={{ time: match?.time || '' }}
                                                                                            validationSchema={schema}
                                                                                            onSubmit={(values, { setSubmitting }) => {
                                                                                                handleSubmit(values, match);
                                                                                            }}
                                                                                            enableReinitialize>
                                                                                            {({ errors, setFieldValue }) => (
                                                                                                <Form>
                                                                                                    <div className="row align-items-center">
                                                                                                        <Field
                                                                                                            type="datetime-local"
                                                                                                            className="col-8 form-control"
                                                                                                            name="time"
                                                                                                            value={match.time}
                                                                                                            onChange={(e) => {
                                                                                                                match.time = e.target.value;
                                                                                                                setFieldValue('time', e.target.value);
                                                                                                            }}
                                                                                                        />
                                                                                                        <ErrorMessage name="time" component="div" className="text-danger" />                                                                                                </div>

                                                                                                    <Button
                                                                                                        className="my-2"
                                                                                                        variant="contained"
                                                                                                        color="primary"
                                                                                                        type="submit">
                                                                                                        Confirm Time
                                                                                                    </Button>
                                                                                                </Form>
                                                                                            )}
                                                                                        </Formik>
                                                                                    }
                                                                                </div>

                                                                            </div>

                                                                        </div>

                                                                        <div className="col-12 col-md-3 team-card text-center" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)' }}>
                                                                            <h2>{match.team2.name}</h2>
                                                                            <img src={`${process.env.REACT_APP_API_URL}/${match.team2.logo.replace(/\\/g, '/')}`} alt={match.team2.name} style={{ height: '100px', marginRight: '10px' }} />
                                                                            <p>{match.team2.location}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </AccordionDetails>
                                    </Accordion> <br />
                                    <Button
                                        variant="outlined"
                                        style={{
                                            alignItems: 'center',
                                            margin: '0 auto',
                                            display: 'block',
                                            padding: '10px 40px',
                                            backgroundColor: '#6BE85F',
                                            color: '#fff',
                                            borderRadius: '5px',
                                            fontSize: '1.2em',
                                            fontWeight: 'bold',
                                            transition: '0.3s',

                                        }}>
                                        <Link to="/setuptournament/mytournaments" style={{ color: '#fff', textDecoration: 'none' }}>
                                            Confirm Stage <KTIcon iconName='' className='fs-3' />
                                        </Link>
                                        </Button>
                                </div >
                            </>
                        )}

                    </>
                }
            </>


            <>
                {
                    stages.length == 2 &&
                    <>
                        <h1>SECOND STAGE</h1>
                        {stages[1].groups.map((group: any, groupIndex: number) =>
                            <>
                                <div key={groupIndex} className="my-5 border border-3 p-5 rounded" style={{ backgroundColor: '#f0f2f5', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' }}>

                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <div className="row w-100">
                                                <h1 className="text-center">GROUP: {group.name}</h1>
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {
                                                group.matches.map((match: any, matchIndex: number) => {
                                                    return (
                                                        <div key={matchIndex} className="card mt-9 mx-5" style={{ backgroundColor: 'white' }}>
                                                            <div className="card-body" style={{
                                                                borderRadius: '10px', // Adjust as needed
                                                            }}>
                                                                <div key={matchIndex}>
                                                                    <div className="row align-items-center justify-content-around">
                                                                        <div className="col-12 col-md-3 team-card text-center" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)' }}>
                                                                            <h2>{match.team1.name}</h2>
                                                                            <img src={`${process.env.REACT_APP_API_URL}/${match.team1.logo.replace(/\\/g, '/')}`} alt={match.team1.name} style={{ height: '100px', marginRight: '10px' }} />
                                                                            <p>{match.team1.location}</p>
                                                                        </div>

                                                                        <div className="col-12 col-md-5 d-flex justify-content-center my-5">
                                                                            <div className="container-fluid text-center">

                                                                                <h2 className="row text-center" style={{ color: '#6c757d' }}>

                                                                                    <div className="col-auto mx-auto">
                                                                                        VS
                                                                                    </div>

                                                                                </h2>

                                                                                <div className="row">
                                                                                    {match?.time ?
                                                                                        <h3>{new Date(match.time).toLocaleString()}</h3> :
                                                                                        <Formik
                                                                                            initialValues={{ time: match?.time || '' }}
                                                                                            validationSchema={schema}
                                                                                            onSubmit={(values, { setSubmitting }) => {
                                                                                                handleSubmit(values, match);
                                                                                            }}
                                                                                            enableReinitialize>
                                                                                            {({ errors, setFieldValue }) => (
                                                                                                <Form>
                                                                                                    <div className="row align-items-center">
                                                                                                        <Field
                                                                                                            type="datetime-local"
                                                                                                            className="col-8 form-control"
                                                                                                            name="time"
                                                                                                            value={match.time}
                                                                                                            onChange={(e) => {
                                                                                                                match.time = e.target.value;
                                                                                                                setFieldValue('time', e.target.value);
                                                                                                            }}
                                                                                                        />
                                                                                                        <ErrorMessage name="time" component="div" className="text-danger" />                                                                                                </div>

                                                                                                    <Button
                                                                                                        className="my-2"
                                                                                                        variant="contained"
                                                                                                        color="primary"
                                                                                                        type="submit">
                                                                                                        Confirm Time
                                                                                                    </Button>
                                                                                                </Form>
                                                                                            )}
                                                                                        </Formik>
                                                                                    }
                                                                                </div>

                                                                            </div>

                                                                        </div>

                                                                        <div className="col-12 col-md-3 team-card text-center" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)' }}>
                                                                            <h2>{match.team2.name}</h2>
                                                                            <img src={`${process.env.REACT_APP_API_URL}/${match.team2.logo.replace(/\\/g, '/')}`} alt={match.team2.name} style={{ height: '100px', marginRight: '10px' }} />
                                                                            <p>{match.team2.location}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </AccordionDetails>
                                    </Accordion>
                                </div >
                            </>
                        )}
                    </>
                }
            </>

            <>
                {
                    stages.length == 3 &&
                    <>
                        <h1>THIRD STAGE</h1>
                        {stages[2].groups.map((group: any, groupIndex: number) =>
                            <>
                                <div key={groupIndex} className="my-5 border border-3 p-5 rounded" style={{ backgroundColor: '#f0f2f5', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' }}>

                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <div className="row w-100">
                                                <h1 className="text-center">GROUP: {group.name}</h1>
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {
                                                group.matches.map((match: any, matchIndex: number) => {
                                                    return (
                                                    
                                                      
                                                        <div key={matchIndex} className="card mt-9 mx-5" style={{ backgroundColor: 'white' }}>
                                                            <div className="card-body" style={{
                                                                borderRadius: '10px', // Adjust as needed
                                                            }}>
                                                                <div key={matchIndex}>
                                                                    <div className="row align-items-center justify-content-around">
                                                                        <div className="col-12 col-md-3 team-card text-center" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)' }}>
                                                                            <h2>{match.team1.name}</h2>
                                                                            <img src={`${process.env.REACT_APP_API_URL}/${match.team1.logo.replace(/\\/g, '/')}`} alt={match.team1.name} style={{ height: '100px', marginRight: '10px' }} />
                                                                            <p>{match.team1.location}</p>
                                                                        </div>

                                                                        <div className="col-12 col-md-5 d-flex justify-content-center my-5">
                                                                            <div className="container-fluid text-center">

                                                                                <h2 className="row text-center" style={{ color: '#6c757d' }}>

                                                                                    <div className="col-auto mx-auto">
                                                                                        VS
                                                                                    </div>

                                                                                </h2>

                                                                                <div className="row">
                                                                                    {match?.time ?
                                                                                        <h3>{new Date(match.time).toLocaleString()}</h3> :
                                                                                        <Formik
                                                                                            initialValues={{ time: match?.time || '' }}
                                                                                            validationSchema={schema}
                                                                                            onSubmit={(values, { setSubmitting }) => {
                                                                                                handleSubmit(values, match);
                                                                                            }}
                                                                                            enableReinitialize>
                                                                                            {({ errors, setFieldValue }) => (
                                                                                                <Form>
                                                                                                    <div className="row align-items-center">
                                                                                                        <Field
                                                                                                            type="datetime-local"
                                                                                                            className="col-8 form-control"
                                                                                                            name="time"
                                                                                                            value={match.time}
                                                                                                            onChange={(e) => {
                                                                                                                match.time = e.target.value;
                                                                                                                setFieldValue('time', e.target.value);
                                                                                                            }}
                                                                                                        />
                                                                                                        <ErrorMessage name="time" component="div" className="text-danger" />                                                                                                </div>

                                                                                                    <Button
                                                                                                        className="my-2"
                                                                                                        variant="contained"
                                                                                                        color="primary"
                                                                                                        type="submit">
                                                                                                        Confirm Time
                                                                                                    </Button>
                                                                                                </Form>
                                                                                            )}
                                                                                        </Formik>
                                                                                    }
                                                                                </div>

                                                                            </div>

                                                                        </div>

                                                                        <div className="col-12 col-md-3 team-card text-center" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)' }}>
                                                                            <h2>{match.team2.name}</h2>
                                                                            <img src={`${process.env.REACT_APP_API_URL}/${match.team2.logo.replace(/\\/g, '/')}`} alt={match.team2.name} style={{ height: '100px', marginRight: '10px' }} />
                                                                            <p>{match.team2.location}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </AccordionDetails>
                                    </Accordion>
                                </div >
                            </>
                        )}
                    </>
                }
            </>


            <>
                {
                    stages.length > 3 &&
                    <>
                        {stages[stages.length - 1].groups[0].teams.length == 1 &&
                            <>
                                    <ParticleBg/>
                                <div className="container-fluid">

                                    <div className="row justify-content-center" >
                                        <h1 className="col-auto">WINNER </h1>
                                    </div>
                                    <div className="row justify-content-center" >
                                        <div className="col-12 col-md-3 team-card text-center" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)' }}>
                                            <h2>{stages[stages.length - 1].groups[0].teams[0].name}</h2>
                                            <img src={`${process.env.REACT_APP_API_URL}/${stages[stages.length - 1].groups[0].teams[0].logo.replace(/\\/g, '/')}`} alt={stages[stages.length - 1].groups[0].teams[0].name} style={{ height: '100px', marginRight: '10px' }} />
                                            <p>{stages[stages.length - 1].groups[0].teams[0].location}</p>
                                        </div>
                                    </div>

                                </div>

                                {stages[0].groups.map((group: any, groupIndex: number) => {
                                    return (
                                        <>
                                            <div className="container my-5">
                                                <StandingTeams teams={group.teams} />
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                        }
                        {stages[stages.length - 1].groups[0].teams.length > 1 &&
                            <>

                                <h1>STAGE {stages.length}</h1>
                                {stages[stages.length - 1].groups.map((group: any, groupIndex: number) =>
                                    <>
                                        <div key={groupIndex} className="my-5 border border-3 p-5 rounded" style={{ backgroundColor: '#f0f2f5', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' }}>

                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1-content"
                                                    id="panel1-header"
                                                >
                                                    <div className="row w-100">
                                                        <h1 className="text-center">GROUP: {group.name}</h1>
                                                    </div>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    {
                                                        group.matches.map((match: any, matchIndex: number) => {
                                                            return (
                                                                <div key={matchIndex} className="card mt-9 mx-5" style={{ backgroundColor: 'white' }}>
                                                                    <div className="card-body" style={{
                                                                        borderRadius: '10px', // Adjust as needed
                                                                    }}>
                                                                        <div key={matchIndex}>
                                                                            <div className="row align-items-center justify-content-around">
                                                                                <div className="col-12 col-md-3 team-card text-center" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)' }}>
                                                                                    <h2>{match.team1.name}</h2>
                                                                                    <img src={`${process.env.REACT_APP_API_URL}/${match.team1.logo.replace(/\\/g, '/')}`} alt={match.team1.name} style={{ height: '100px', marginRight: '10px' }} />
                                                                                    <p>{match.team1.location}</p>
                                                                                </div>

                                                                                <div className="col-12 col-md-5 d-flex justify-content-center my-5">
                                                                                    <div className="container-fluid text-center">

                                                                                        <h2 className="row text-center" style={{ color: '#6c757d' }}>

                                                                                            <div className="col-auto mx-auto">
                                                                                                VS
                                                                                            </div>

                                                                                        </h2>

                                                                                        <div className="row">
                                                                                            {match?.time ?
                                                                                                <h3>{new Date(match.time).toLocaleString()}</h3> :
                                                                                                <Formik
                                                                                                    initialValues={{ time: match?.time || '' }}
                                                                                                    validationSchema={schema}
                                                                                                    onSubmit={(values, { setSubmitting }) => {
                                                                                                        handleSubmit(values, match);
                                                                                                    }}
                                                                                                    enableReinitialize>
                                                                                                    {({ errors, setFieldValue }) => (
                                                                                                        <Form>
                                                                                                            <div className="row align-items-center">
                                                                                                                <Field
                                                                                                                    type="datetime-local"
                                                                                                                    className="col-8 form-control"
                                                                                                                    name="time"
                                                                                                                    value={match.time}
                                                                                                                    onChange={(e) => {
                                                                                                                        match.time = e.target.value;
                                                                                                                        setFieldValue('time', e.target.value);
                                                                                                                    }}
                                                                                                                />
                                                                                                                <ErrorMessage name="time" component="div" className="text-danger" />                                                                                                </div>

                                                                                                            <Button
                                                                                                                className="my-2"
                                                                                                                variant="contained"
                                                                                                                color="primary"
                                                                                                                type="submit">
                                                                                                                Confirm Time
                                                                                                            </Button>
                                                                                                        </Form>
                                                                                                    )}
                                                                                                </Formik>
                                                                                            }
                                                                                        </div>

                                                                                    </div>

                                                                                </div>

                                                                                <div className="col-12 col-md-3 team-card text-center" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)' }}>
                                                                                    <h2>{match.team2.name}</h2>
                                                                                    <img src={`${process.env.REACT_APP_API_URL}/${match.team2.logo.replace(/\\/g, '/')}`} alt={match.team2.name} style={{ height: '100px', marginRight: '10px' }} />
                                                                                    <p>{match.team2.location}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </AccordionDetails>
                                            </Accordion>
                                           
                                        </div >
                                    </>
                                )}
                            </>
                        }
                    </>
                }
            </>


        </>

    );
}
export default MatchesConfig;


