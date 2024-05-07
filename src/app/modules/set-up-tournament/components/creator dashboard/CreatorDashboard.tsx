import { toAbsoluteUrl } from "../../../../../_metronic/helpers";
import { CardsWidget17, CardsWidget20, CardsWidget7, EngageWidget10, ListsWidget26 } from "../../../../../_metronic/partials/widgets";
import axios from 'axios';
import { useAuth } from "../../../auth";
import { useEffect, useState } from "react";
import { MixedWidget1 } from "../../../../../_metronic/partials/widgets";
import { TextField, MenuItem, FormControl, Select, InputLabel, SelectChangeEvent } from '@mui/material';






// Tournament interface defined earlier
interface Tournament {
    _id: string;
    tournamentLogo?: string;
    tournamentName: string;
    tournamentLevel: string;
    country?: string;
    tournamentStartDate?: Date;
    tournamentEndDate?: Date;
    tournamentSexe: string;
    divisions: string[];
    status: string;
    createdBy: string;
  }





const CreatorDashboard = () => {


    const [tournaments, setTournaments] = useState<Tournament[]>([]); 
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const { auth } = useAuth();



    useEffect(() => {
        const fetchTournaments = async () => {
          try {
            // Retrieve the auth token from somewhere (e.g., local storage)
            
            
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/tournament/user-tournaments`, {
              headers: {
                'Authorization': `Bearer ${auth?.api_token}`
              }
            });
            console.log('response.data', response.data.tournaments);
            setTournaments(response.data.tournaments);
          } catch (error) {
            console.error("Error fetching tournaments:", error);
            // Handle error (e.g., show an error message)
          }
        };
    
        fetchTournaments();
      }, []);


      const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
      };
    
      const handleStatusFilterChange = (event: SelectChangeEvent) => {
        setStatusFilter(event.target.value as string);
      };
      
    
      const filteredTournaments = tournaments.filter((tournament) => {
        // Convert all relevant tournament attributes to a single string for easier searching.
        const tournamentData = `
          ${tournament.tournamentName.toLowerCase()} 
          ${tournament.tournamentLevel.toLowerCase()} 
          ${tournament.country?.toLowerCase()} 
          ${tournament.tournamentSexe.toLowerCase()} 
          ${tournament.status.toLowerCase()}
          ${tournament.divisions.join(' ').toLowerCase()}
        `;
    
        // Check if the tournament matches the search query and status filter.
        return (
          tournamentData.includes(searchQuery.toLowerCase()) &&
          (statusFilter ? tournament.status === statusFilter : true)
        );
      });


    
    return (
        <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
        {/* begin::Col */}
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
          <CardsWidget20 
            className='h-md-50 mb-5 mb-xl-10'
            description='Active Projects'
            color='#F1416C'
            img={toAbsoluteUrl('/media/patterns/vector-1.png')}
          />
          <CardsWidget7
            className='h-md-50 mb-5 mb-xl-10'
            description='Professionals'
            icon={false}
            stats={357}
            labelColor='dark'
            textColor='gray-300'
          />
        </div>
        {/* end::Col */}
  
        {/* begin::Col */}
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
          <CardsWidget17 className='h-md-50 mb-5 mb-xl-10' />
          <ListsWidget26 className='h-lg-50' />
        </div>
        {/* end::Col */}
  
        {/* begin::Col */}
        <div className='col-xxl-6'>
          <EngageWidget10 className='h-md-100' />
        </div>
        {/* end::Col */}

        {/* Inside CreatorDashboard return statement, replace one of the placeholders with: */}
        <div className='search-and-filter'>
        <TextField
          label='Search Tournaments'
          variant='outlined'
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px' }}
        />
        <FormControl fullWidth>
          <InputLabel id='status-filter-label'>Status</InputLabel>
          <Select
            labelId='status-filter-label'
            value={statusFilter}
            label='Status'
            onChange={handleStatusFilterChange}
          >
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='completed'>Completed</MenuItem>
            <MenuItem value='pending'>Pending</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
        {filteredTournaments.map((tournament) => (
          <div key={tournament._id} className='col-md-6 col-lg-4 col-xl-4'>
            <MixedWidget1 tournament={tournament} />
          </div>
        ))}
      </div>


        
      </div>
    );
    };
export default CreatorDashboard;