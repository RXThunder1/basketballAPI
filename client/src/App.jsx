import React, { useState } from 'react';
import './index.css';           // general styles, keep at top
import './background.css';
import SearchBar from './components/SearchBar';
import GamesTable from './components/GamesTable';
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

      {/* search bar (passes the type & query back up) */}
      <SearchBar onSearch={handleSearch} />

      <div className="search-results">

        {results.length > 0 ? (
  <>
    {searchType === "games" ? (
      <GamesTable games={results} />
    ) : searchType === "players" ? (
      <ul>
        {results.map((item, index) => (
          <li key={index}>
            {item.first_name} {item.last_name} - {item.team?.full_name}
          </li>
        ))}
      </ul>
    ) : (
      <ul>
        {results.map((item, index) => (
          <li key={index}>
            {item.full_name} ({item.abbreviation})
          </li>
        ))}
      </ul>
    )}
  </>
) : (
  <p>No results found</p>
)}


      </div>
    </div>
  );
}
