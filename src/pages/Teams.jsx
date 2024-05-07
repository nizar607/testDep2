import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Teams = () => {

const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const api = import.meta.env.VITE_API_URL;


  useEffect(() => {
    // fetch all teams using axios
    axios.get(`${api}/team/get-teams`)
      .then((response) => {
        console.log("Teams fetched successfully", response.data);
        setTeams(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  }, []);

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

    return (
        <>
            <h1>Teams</h1>
            <p>Teams Page</p>
            <div className="container ">
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by team name..."
          onChange={e => setSearch(e.target.value)}
        />
        <div className="row">
            {filteredTeams.map((team, index) => (
                <div key={index} className="col-md-4 mb-4">
                <div className="card">
                    <div className="team-logo-container" style={{ position: 'relative' }}>
                    <img 
                        src={`${api}/${team.logo}`} 
                        className="card-img-top" 
                        alt={team.name} 
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                    />
                              <Link 
                                to={`/teamdetail/${team._id}`}
                                style={{ 
                                position: 'absolute', 
                                top: '50%', 
                                left: '50%',
                                fontWeight: 'bold', 
                                transform: 'translate(-50%, -50%)', 
                                opacity: 0, 
                                transition: 'opacity 0.3s',
                                padding: '10px 20px' // Y padding of 10px, X padding of 20px
                                }}
                                className="btn btn-primary team-details-button"
                                onMouseOver={e => {
                                e.currentTarget.style.opacity = 1;
                                e.currentTarget.previousSibling.style.filter = 'blur(2px)';
                                }}
                                onMouseOut={e => {
                                e.currentTarget.style.opacity = 0;
                                e.currentTarget.previousSibling.style.filter = 'none';
                                }}
                            >
                                Browse Team Details
                            </Link>
                    </div>
                    <div className="card-body">
                    <h5 className="card-title" style={{ color: 'black', fontSize: '24px' , fontWeight:'bold' }}>{team.name}</h5>
                    <p className="card-text">Divisions : {team.division}</p>
              
                    </div>
                </div>
                </div>
            ))}
            </div>
      </div>
        </>
    )
}

export default Teams;