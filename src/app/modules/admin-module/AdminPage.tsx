import { Route, Routes, Outlet } from 'react-router-dom'
import TournamentPage from './components/TournamentPage';
import DisplayDivisions from '../set-up-tournament/components/tournaments-divisions/displayDivisions';
import UsersPage from './components/UsersPage';
import TeamsPage from './components/TeamsPage';
import MatchsPage from './components/MatchsPage';
import ContactPage from './components/ContactPage';

//import SetUpTournament from './components/my-tournaments/SetUpTournament';



const AdminPage = () => (

    <Routes>
        <Route element={<Outlet />}>

            <Route
                path='alltournaments'
                element={
                    <>
                        <TournamentPage />
                    </>}
            />


            <Route
                path='Users'
                element={
                    <>
                        <UsersPage />
                    </>
                }
            />

            <Route
                path='displaydivisions/:id'
                element={
                    <>
                        <DisplayDivisions />
                    </>
                }
            />

            <Route
                path='allteams'
                element={
                    <>
                        <TeamsPage />
                    </>
                }
            />



            <Route
                path='allteams'
                element={
                    <>
                        <TeamsPage />
                    </>
                }
            />


            <Route
                path='allmatchs'
                element={
                    <>
                        <MatchsPage />
                    </>
                }
            />

            <Route
                path='contacts'
                element={
                    <>
                        <ContactPage />
                    </>
                }
            />



        </Route>
    </Routes>

)

export default AdminPage;