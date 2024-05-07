import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useAuth } from '../../../../app/modules/auth';

type Match = {
  _id: any;
  team1Name: string;
  team1Logo: string;
  team2Name: string;
  team2Logo: string;
  divisionName: string;
  time: string;

};

const TablesWidgetMatchs: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 5; // Nombre de matchs par page
  const { auth } = useAuth();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://localhost:3001/match/matches');
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

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


  return (
    <div>
      {/* Matches Cards */}
      {currentMatches.map((match, index) => (

        <div key={index} className="card mt-4" style={{
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)',
          borderRadius: '10px',
        }}>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col text-center">
                <img src={`http://localhost:3001/${match.team1Logo}`} alt={match.team1Name} style={{ width: '100px', height: '100px' }} />
                <div className="mt-2"><strong>{match.team1Name}</strong></div>
              </div>
              <div className="col text-center">
                <h5 className="card-title">VS</h5>
                <p className="card-text"><small className="text-muted">{match.divisionName}</small></p>
                <p className="card-text">{new Date(match.time).toLocaleString()}</p>
              </div>
              <div className="col text-center">
                <img src={`http://localhost:3001/${match.team2Logo}`} alt={match.team2Name} style={{ width: '100px', height: '100px' }} />
                <div className="mt-2"><strong>{match.team2Name}</strong></div>
              </div>
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


          </div>
        </div>
      ))}
      {/* Pagination */}
      <Stack spacing={2} justifyContent="center" alignItems="center" mt={4}>
        <Pagination
          count={Math.ceil(matches.length / matchesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export { TablesWidgetMatchs };
