import React, { useState , useEffect , FC } from 'react';
import { useFormikContext, Field } from 'formik';
import { ISetUpTournament } from '../SetUpTournamentWizardHelper';
import { KTIcon } from '../../../../../_metronic/helpers';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useAuth } from '../../../auth';



type step3props = {
    divisionId ?: string;
}


const Step3Horizentale:FC<step3props> = ({ divisionId }) =>{
    const { values, setFieldValue , errors} = useFormikContext<ISetUpTournament>();
    const [newTeam, setNewTeam] = useState({ name: '', logo: null , location: '' });
    const { auth } = useAuth();
    const [error, setError] = useState(true);
   
    


    // remove element from the combo box if he is selected 
    const selectedTeamNames = new Set(values.teams?.map(team => team.name));

    // auto complete data
    const [teams, setTeams] = useState<{ name: string , location:string , logo:string }[]>([]);

        useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/team/teams/${divisionId}`, {
                    headers: {
                      Authorization: `Bearer ${auth?.api_token}`
                    }
                  });
            console.log('response.data', response.data);
            setTeams(response.data.teams);
            } catch (error) {
            console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
        }, [divisionId, auth?.api_token]);



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewTeam({ ...newTeam, logo: file });
    };

    const handleAddTeam = () => {
        if (newTeam.name && newTeam.logo) {
            if (teams.some(team => team.name === newTeam.name)) {
                setError(false);
                console.log('error', error);
            } else {
                setFieldValue('teams', [...(values.teams || []), newTeam]);
                setNewTeam({name: '', logo: null , location: '' });
                setError(true);
            }
        }
    };

    return (
        <div className="container">
            
            
        
        <div className="row ">
            <div className="col-md-6">
           
            <Autocomplete
                id="combo-box-demo"
                options={teams.filter(team => !selectedTeamNames.has(team.name))}
                getOptionLabel={(option) => option.name}
                style={{ width: 280 }}
                renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                renderOption={(props, option) => (
                    <li {...props}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={`${process.env.REACT_APP_API_URL}/${option.logo.replace(/\\/g, '/')}`}alt={option.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                            <div>
                                <div>{option.name}</div>
                                <div style={{ fontSize: '0.8em', color: '#888' }}>{option.location}</div>
                            </div>
                        </div>
                    </li>
                )}
                onChange={(event, newValue) => {
                    if (newValue) {
                        setFieldValue('teams', [...(values.teams || []), newValue]);
                        console.log('values.teams', values.teams);
                    }
                }}
            />
            
             <br /><br />

           

                {/** divider line */}
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <hr style={{ flex: 1 , borderTop: '2px solid '}} />
                    <span style={{ margin: '0 10px' }}>or</span>
                    <hr style={{ flex: 1 , borderTop: '2px solid '}} />
                </div> <br /><br />


                <Field name="name" className="form-control" placeholder="Team Name" value={newTeam.name} onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })} />
                <br />
                <Field name="location" className="form-control" placeholder="Team Location" value={newTeam.location} onChange={(e) => setNewTeam({ ...newTeam, location: e.target.value })} />
                <br />
                <input type="file" name="logo" className="form-control" onChange={handleFileChange} />
                <br />
                <button type="button" className="btn btn-warning mt-2" onClick={handleAddTeam}><KTIcon iconName='plus' className='fs-3' />Add Team</button>
            </div>
            <div className="col-md-6 ">
            <h2><i className="fas fa-users "></i> Teams Added</h2>
                {errors.teams && <div className="text-danger">{errors.teams}</div>}
                <table className='table align-middle gs-0 gy-3 ms-10'>
                    <thead>
                        <tr>
                            <th className='p-0 w-50px'></th>
                            <th className='p-0 min-w-150px'></th>
                            <th className='p-0 min-w-140px'></th>
                            <th className='p-0 min-w-120px'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {values.teams?.map((team, index) => (
                            <tr key={index}>
                                <td>
                                <div className='symbol symbol-50px'>
                                    {team.logo && (team.logo instanceof File 
                                        ? <img src={URL.createObjectURL(team.logo)} alt='' />
                                        : <img src={`${process.env.REACT_APP_API_URL}/${(team.logo as string).replace(/\\/g, '/')}`} alt='' />)
                                    }
                                </div>
                                </td>
                                <td>
                                    <span  className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                                        {team.name}
                                    </span>
                                    <span className='text-muted fw-semibold d-block fs-7'>{team.location}</span>
                                </td>
                                <td></td>
                                <td className='text-end'>
                                
                                <button type="button" className="btn btn-light btn-active-light-primary btn-sm" onClick={() => setFieldValue('teams', values.teams?.filter((_, i) => i !== index))}>
                                <div className="text-danger" hidden={error}>{error}</div>
                                    <KTIcon iconName='trash' className='fs-3' />
                               </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
    </div>
    );
};

export { Step3Horizentale };