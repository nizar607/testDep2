import {Route, Routes, Outlet} from 'react-router-dom'
import SetUpTournament from '../../set-up-tournament/components/my-tournaments/SetUpTournament';
import DisplayDivisions from '../../set-up-tournament/components/tournaments-divisions/displayDivisions';
import TournamentPage from './TournamentPage';
//import SetUpTournament from './components/my-tournaments/SetUpTournament';



const AdminPage=()=>(
    
    <Routes>
        <Route element={<Outlet />}>

                    <Route
                        path='alltournaments'
                        element={
                        <>                   
                        <TournamentPage /> 
                        </> }
                        />

                    

                    <Route
                        path='displaydivisions/:id'
                        element={
                            <>
                                <DisplayDivisions />
                            </>
                        }
                    />
                    
        </Route>
    </Routes>

        )

export default AdminPage;