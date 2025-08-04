import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import axios from 'axios';

export default function App() {
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState("players");

  const handleSearch = async (query, type) => {
    try {
      const response = await axios.get(`/api/${type}`, {
        params: { search: query }
      });
      setSearchType(type);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error.message);
      setResults([]);
    }
  };

  return (
    <div className="container">
      <h1>Basketball API Search</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="search-results">
        {results.length > 0 ? (
          <ul>
            {results.map((item, index) => (
              <li key={index}>
                {searchType === "players" && `${item.first_name} ${item.last_name} - ${item.team?.full_name}`}
                {searchType === "teams" && `${item.full_name} (${item.abbreviation})`}
                {searchType === "games" && `${item.home_team.full_name} vs ${item.visitor_team.full_name} | Score: ${item.home_team_score}-${item.visitor_team_score}`}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}
