require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper for headers
const API_HEADERS = {
  Authorization: `Bearer ${process.env.BALLDONTLIE_API_KEY}`,
};

// =================== API ROUTES ===================

// Players
app.get("/api/players", async (req, res) => {
  try {
    const { search } = req.query;
    const url = search
      ? `https://api.balldontlie.io/v1/players?search=${encodeURIComponent(
          search
        )}`
      : `https://api.balldontlie.io/v1/players`;

    const response = await axios.get(url, { headers: API_HEADERS });
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching players:", err.message);
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

// Teams
app.get("/api/teams", async (req, res) => {
  try {
    const { search } = req.query;
    const url = `https://api.balldontlie.io/v1/teams`;

    const response = await axios.get(url, { headers: API_HEADERS });

    // Filter locally if search query is provided
    let teams = response.data.data;
    if (search) {
      const lower = search.toLowerCase();
      teams = teams.filter(
        (t) =>
          t.full_name.toLowerCase().includes(lower) ||
          t.abbreviation.toLowerCase().includes(lower) ||
          t.city.toLowerCase().includes(lower)
      );
    }

    res.json({ data: teams });
  } catch (err) {
    console.error("Error fetching teams:", err.message);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});

// Games
app.get("/api/games", async (req, res) => {
  try {
    const { search } = req.query;
    const url = `https://api.balldontlie.io/v1/games`;

    const response = await axios.get(url, { headers: API_HEADERS });

    // Filter locally if search query is provided
    let games = response.data.data;
    if (search) {
      const lower = search.toLowerCase();
      games = games.filter(
        (g) =>
          g.home_team.full_name.toLowerCase().includes(lower) ||
          g.visitor_team.full_name.toLowerCase().includes(lower)
      );
    }

    res.json({ data: games });
  } catch (err) {
    console.error("Error fetching games:", err.message);
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

// =================== STATIC FRONTEND ===================
app.use(express.static(path.join(__dirname, "client_dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client_dist", "index.html"));
});

// =================== START SERVER ===================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

