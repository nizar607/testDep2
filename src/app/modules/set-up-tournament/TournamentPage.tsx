import { Route, Routes, Outlet } from 'react-router-dom'
//import SetUpTournament from './components/my-tournaments/SetUpTournament';
import SetUpTournament from './components/my-tournaments/SetUpTournament';
import DisplayDivisions from './components/tournaments-divisions/displayDivisions';
import DivisionConfig from './components/division-config/DivisionConfig';
import MatchConfig from './components/match-config/MatchConfig';
import SingleMatchBracket from './components/single-match-elimination-bracket/SingleMtachBracket';
import CreatorDashboard from './components/creator dashboard/CreatorDashboard';
import MixedTournamentGroupsConfig from './components/mixedTournamentGroupsConfig/MixedTournamentGroupsConfig';
import MixedTournamentMatchesConfig from './components/mixedTournamentMatchesConfig/MatchesConfig';
import Championship from './components/championship/championship';
import ChampionshipStatus from './components/championship/ChampionshipStatus';
import ChampionshipMatches from './components/championship/ChampionshipMatches';
import EditPlayer from '../TeamModule/components/EditPLayer';


const TournamentPage = () => (

    <Routes>
        <Route element={<Outlet />}>

            <Route
                path='mytournaments'
                element={
                    <>
                        <SetUpTournament />
                    </>}
            />

            <Route
                path='displaydivisions/:Tournamentid'
                element={
                    <>
                        <DisplayDivisions />
                    </>
                }
            />

            <Route
                path='editPlayer'
                element={<EditPlayer />} />

            <Route
                path='divisionconfig/:id/:tournamentid'
                element={
                    <>
                        <DivisionConfig />
                    </>
                }
            />

            <Route
                path='matchconfig/:id'
                element={
                    <>
                        <MatchConfig />
                    </>
                }
            />

            <Route
                path='matchconfig/:id'
                element={
                    <>
                        <MatchConfig />
                    </>
                }
            />

            <Route
                path='mixedTournamentGroupsConfig/:id'
                element={
                    <>
                        <MixedTournamentGroupsConfig />
                    </>
                }
            />

            <Route
                path='mixedTournamentMatchesConfig/:id'
                element={
                    <>
                        <MixedTournamentMatchesConfig />
                    </>
                }
            />

            <Route
                path='bracket/:id'
                element={
                    <>
                        <SingleMatchBracket />
                    </>
                }
            />

            <Route
                path='creatordashboard'
                element={
                    <>
                        <CreatorDashboard />
                    </>
                }
            />
            <Route
                path='championship/:id'
                element={
                    <>
                        <Championship />
                    </>
                }
            />

            <Route
                path='ChampionshipStatus/:divisionId'
                element={
                    <>
                        <ChampionshipStatus />
                    </>
                }
            />


            <Route
                path='ChampionshipMatchs/:id'
                element={
                    <>
                        <ChampionshipMatches />
                    </>
                }
            />

        </Route>




    </Routes>

)

export default TournamentPage;