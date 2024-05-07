import {useState , useEffect}from 'react'
import axios from 'axios';

import { TablesWidget11Admin } from '../../../../_metronic/partials/widgets/tables/TablesWidget11Admin';
import { useAuth } from '../../auth';


function TournamentPage(){

    const [tournaments, setTournaments] = useState([]);
    const { auth } = useAuth();



    const fetchTournaments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tournament/tournamentsAdmin`, {
          headers: {
            Authorization: `Bearer ${auth?.api_token}`,
          },
        });
        setTournaments(response.data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };
  
    useEffect(() => {
      fetchTournaments();
    }, []);
  





   return(
        <div>
            <TablesWidget11Admin tournaments={tournaments}  />
         

        </div>
    )

}


export default TournamentPage;