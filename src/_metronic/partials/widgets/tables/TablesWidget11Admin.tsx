import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// Définition du type pour les tournois
type Tournament = {
  _id: string;
  tournamentName: string;
  tournamentLogo: string;
  tournamentSexe: string;
  divisions: string;
  tournamentStartDate: string;
  tournamentEndDate: string;
  status: string;
  isApprouved: string;
};

type Props = {
  tournaments: Tournament[];
};

const TablesWidget11Admin: React.FC<Props> = ({ tournaments }) => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tournamentsPerPage = 5;
  const [newTournaments, setNewTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    setNewTournaments(tournaments);
  }, [tournaments]);

  const handleDelete = async (tournamentId: string) => {

  };

  const handleApprove = async (tournamentId: string) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/tournament/tournamentstatus/${tournamentId}`, {
        isApprouved: 'approved',
      });

      if (response.status === 200) {
        const updatedTournaments = newTournaments.map(tournament =>
          tournament._id === tournamentId ? { ...tournament, isApprouved: 'approved' } : tournament
        );
        setNewTournaments(updatedTournaments);
        alert('Tournoi approuvé avec succès.');
      }
    } catch (error) {
      console.error('Erreur lors de l’approbation du tournoi:', error);
      alert('Erreur lors de l’approbation du tournoi.');
    }
  };

  const filteredTournaments = newTournaments.filter(tournament =>
    tournament.tournamentName.toLowerCase().includes(searchText.toLowerCase())
  );

  const indexOfLastTournament = currentPage * tournamentsPerPage;
  const indexOfFirstTournament = indexOfLastTournament - tournamentsPerPage;
  const currentTournaments = filteredTournaments.slice(indexOfFirstTournament, indexOfLastTournament);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className='me-10'>
      <div className='card-body py-3'>
        <TextField
          id="search-tournament"
          label="Search Tournament"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className='table-responsive'>
          <table className='table align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th>Tournament</th>
                <th>Sexe</th>
                <th>Divisions</th>
                <th>Dates</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Is Approved</th>
              </tr>
            </thead>
            <tbody>
              {currentTournaments.map((tournament) => (
                <tr key={tournament._id}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <img src={`${process.env.REACT_APP_API_URL}/${tournament.tournamentLogo}`} alt={tournament.tournamentName} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                      {tournament.tournamentName}
                    </div>
                  </td>
                  <td>{tournament.tournamentSexe}</td>
                  <td>{tournament.divisions}</td>
                  <td>
                    {new Date(tournament.tournamentStartDate).toLocaleDateString()} -
                    {new Date(tournament.tournamentEndDate).toLocaleDateString()}
                  </td>
                  <td>
                    <span className={`badge ${tournament.status === 'Approved' ? 'badge-light-success' : 'badge-light-danger'}`}>
                      {tournament.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${tournament.status === 'approved' ? 'badge-light-success' : 'badge-light-danger'}`}>
                      {tournament.isApprouved}
                    </span>

                  </td>
                  <td className=''>

                  <Button 
  variant="success" 
  size="sm" 
  className="ms-2" 
  onClick={() => handleApprove(tournament._id)}
  disabled={tournament.isApprouved === 'approved'}
>
  Approve
</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Pagination
            count={Math.ceil(filteredTournaments.length / tournamentsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
};

export { TablesWidget11Admin };