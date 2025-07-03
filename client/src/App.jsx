import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [query, setQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);

  const searchPlayers = async () => {
    const res = await axios.get('/api/players', { params: { search: query } });
    setPlayers(res.data);
  };

  const searchTeams = async () => {
    const res = await axios.get('/api/teams');
    setTeams(res.data);
  };

  const searchGames = async () => {
    const res = await axios.get('/api/games', { params: { search: query } });
    setGames(res.data);
  };

  return (
    <div className="App">
      <h1>Basketball Stats Explorer</h1>
      <input
        type="text"
        placeholder="Search players or games..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div>
        <button onClick={searchPlayers}>Search Players</button>
        <button onClick={searchTeams}>List Teams</button>
        <button onClick={searchGames}>Search Games</button>
      </div>
      <div>
        {players.length > 0 && (
          <div>
            <h2>Players</h2>
            <ul>
              {players.map(p => (
                <li key={p.id}>{p.first_name} {p.last_name} ({p.team.full_name})</li>
              ))}
            </ul>
          </div>
        )}
        {teams.length > 0 && (
          <div>
            <h2>Teams</h2>
            <ul>
              {teams.map(t => (
                <li key={t.id}>{t.full_name}</li>
              ))}
            </ul>
          </div>
        )}
        {games.length > 0 && (
          <div>
            <h2>Games</h2>
            <ul>
              {games.map(g => (
                <li key={g.id}>{g.home_team.full_name} vs {g.visitor_team.full_name} on {g.date}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
