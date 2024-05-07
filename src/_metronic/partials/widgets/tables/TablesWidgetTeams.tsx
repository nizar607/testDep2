import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

type Team = {
  _id: string;
  name: string;
  logo: string;
  location: string;
  division: string;
};

const TablesWidgetTeams: React.FC = () => {

  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [displayedTeams, setDisplayedTeams] = useState<Team[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 5;
  const [searchText, setSearchText] = useState('');
  const [sortModel, setSortModel] = useState({ field: '', sort: '' });



  const handlePlayers = async (team: Team, teamId: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/division/get-division-byTeamId/${teamId}`);
      console.log(response.data);
      navigate('/team', { state: { teams: [team], PlayerPerTeam: response.data.PlayerPerTeam } });
    }
    catch (error) {
      console.error('Error fetching division:', error);
    }
  }

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:3001/team/allteams');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    let filteredTeams = teams.filter(team =>
      team.name.toLowerCase().includes(searchText.toLowerCase()) ||
      team.location.toLowerCase().includes(searchText.toLowerCase()) ||
      team.division.toLowerCase().includes(searchText.toLowerCase())
    );

    if (sortModel.field) {
      filteredTeams.sort((a, b) => {
        if (a[sortModel.field] < b[sortModel.field]) {
          return sortModel.sort === 'asc' ? -1 : 1;
        }
        if (a[sortModel.field] > b[sortModel.field]) {
          return sortModel.sort === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    const indexOfLastTeam = currentPage * teamsPerPage;
    const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
    const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);

    setDisplayedTeams(currentTeams);
  }, [teams, searchText, sortModel, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleSort = (field: keyof Team) => {
    const isAsc = sortModel.field === field && sortModel.sort === 'asc';
    setSortModel({ field, sort: isAsc ? 'desc' : 'asc' });
  };

  return (
    <div className='me-10'>
      <div className='card-body py-3'>
        <TextField
          id="search-team"
          label="Search Teams"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className='table-responsive'>
          <table className='table align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='text-center rounded-start'>Logo</th>
                <th className='min-w-125px' onClick={() => handleSort('name')}>
                  Team {sortModel.field === 'name' ? (sortModel.sort === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className='min-w-125px' onClick={() => handleSort('location')}>
                  Location {sortModel.field === 'location' ? (sortModel.sort === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className='min-w-125px' onClick={() => handleSort('division')}>
                  Division {sortModel.field === 'division' ? (sortModel.sort === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className='min-w-10px text-end rounded-end'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {displayedTeams.map((team) => (
                <tr key={team._id}>
                  <td className='text-center'>
                    <img src={`http://localhost:3001/${team.logo}`} alt={`${team.name} logo`} style={{ width: '50px', height: '50px' }} />
                  </td>
                  <td>
                    <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                      {team.name}
                    </span>
                  </td>
                  <td>
                    <strong>{team.location}</strong>
                  </td>
                  <td>
                    <span className='badge badge-light-primary fs-7 fw-semibold'>
                      {team.division}
                    </span>
                  </td>
                  <td className='text-end'>
                    {/* navigate('/team', { state: { teams: { selectedTeam: team } } }); */}
                    <Button variant="primary" size="sm" onClick={() => handlePlayers(team, team._id)}>Players</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Pagination
              count={Math.ceil(teams.length / teamsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export { TablesWidgetTeams };
