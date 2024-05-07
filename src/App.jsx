import './App.css';

//sections 
import Header from './sections/Header';
import Home from './pages/Home';
import Footer from './sections/Footer';
import ErrorPage from './pages/ErrorPage';
import Stats from './sections/Stats';

//pages
import Tournaments from './pages/Tournaments';
import Divisions from './pages/Divisions';
import Players from './sections/Players';
import Teams from './pages/Teams';
import TeamDetail from './pages/TeamDetail';
import LiveMatches from './pages/LiveMatches';
import VideoUpload from './pages/VideoUpload';

import FaceToFace from './pages/FaceToFace';
import MatchComponent from './pages/MatchComponent';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EndOfMatch from './sections/EndOfMatch';
import MixedBracket from './sections/MixedBracket';
import ContactForm from './pages/Contact';
import TopPlayers from './sections/TopPlayers';
import TopTeams from './sections/TopTeams';



function App() {
  return (

    <div className="site-wrap">

      <Header />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/match/:matchId" element={<MatchComponent />} />
        <Route path="facetoface/:matchId" element={<FaceToFace />} />
        <Route path="standingTeams" element={<Home />} />
        <Route path="teamdetail/:teamId" element={<TeamDetail />} />
        <Route path="tournaments" element={<Tournaments />} />
        <Route path="teams" element={<Teams />} />
        <Route path="divisions/:tournamentId" element={<Divisions />} />
        <Route path="livematches" element={<LiveMatches />} />
        <Route path="upload-video" element={<VideoUpload />} />
        <Route path="bracket" element={<MixedBracket />} />
        <Route path="contact" element={<ContactForm />} />
        <Route path="topPlayers" element={<TopPlayers/>} />
        <Route path="topTeams" element={<TopTeams/>} />

        <Route path="*" element={<ErrorPage />} />

      </Routes>


      <Footer />

    </div>

  );
}

export default App;