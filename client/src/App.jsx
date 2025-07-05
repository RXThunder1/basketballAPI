import { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("players");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/${searchType}/search?search=${searchTerm}`);
      if (!res.ok) throw new Error(`Failed to fetch ${searchType}`);
      const data = await res.json();
      if (!Array.isArray(data.data)) throw new Error("Unexpected API response");
      setResults(data.data);
    } catch (err) {
      console.error(`Error fetching ${searchType}:`, err);
      setError(`Could not fetch ${searchType}. Try again.`);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🏀 Basketball Search</h1>
      <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
        <option value="players">Search Players</option>
        <option value="teams">Search Teams</option>
        <option value="games">Search Games</option>
      </select>
      <input
        type="text"
        placeholder="Enter search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={fetchData}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="results">
        {results.map((item) => {
          if (searchType === "players") {
            return (
              <div key={item.id} className="card">
                Player: {item.first_name} {item.last_name}
              </div>
            );
          } else if (searchType === "teams") {
            return (
              <div key={item.id} className="card">
                Team: {item.full_name}
              </div>
            );
          } else if (searchType === "games") {
            return (
              <div key={item.id} className="card">
                Game: {item.home_team.full_name} vs {item.visitor_team.full_name}<br />
                Date: {new Date(item.date).toLocaleDateString()}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;