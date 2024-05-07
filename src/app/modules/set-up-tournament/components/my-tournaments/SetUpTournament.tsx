import {useState , useEffect}from 'react'
import { useAuth } from '../../../../modules/auth';
import axios from 'axios';
import {TablesWidget11} from '../../../../../_metronic/partials/widgets/tables/TablesWidget11';


function SetUpTournament(){
    const [tournaments, setTournaments] = useState([]);
    const { auth } = useAuth();



    const fetchTournaments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tournament/user-tournaments`, {
          headers: {
            Authorization: `Bearer ${auth?.api_token}`,
          },
        });
        console.log('response', response.data);
        setTournaments(response.data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };
  
    useEffect(() => {
      fetchTournaments();
    },[]);
  
    
    
    
    
    // tableau de dependances condition d update de useEffect
    return(
        <div>
            {/* tournament headerX
            <img
                    src={toAbsoluteUrl('/media/custom icon/tournament-header.png')}
                    className='w-100'
                    alt=''
                    style={{
                        height: '5%', // Adjust as needed
                        objectFit: 'cover'
                    }}
                />

                  */}

            {/* tournament header */}
            <br />
            <TablesWidget11 tournaments={tournaments}  refreshTournaments={fetchTournaments} />
        </div>
    )
}

export default SetUpTournament;