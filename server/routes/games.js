const express = require("express");
const axios = require("axios");
const router = express.Router();

// 🚨 BallDontLie requires searching teams first to get a team_id
async function findTeamId(search) {
  const url = "https://api.balldontlie.io/v1/teams";

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.BALLDONTLIE_API_KEY}`
    }
  });

  const teams = res.data.data;

  const match = teams.find(t =>
    t.full_name.toLowerCase().includes(search) ||
    t.name.toLowerCase().includes(search) ||
    t.abbreviation.toLowerCase().includes(search)
  );

  return match ? match.id : null;
}

router.get("/", async (req, res) => {
  const search = req.query.search?.toLowerCase();

  try {
    // No search term → return nothing
    if (!search) {
      return res.json([]);
    }

    // 1️⃣ Get team ID based on search term
    const teamId = await findTeamId(search);

    if (!teamId) {
      return res.json([]); // nothing found
    }

    // 2️⃣ Now fetch games for that team
    const gamesUrl = "https://api.balldontlie.io/v1/games";

    const response = await axios.get(gamesUrl, {
      headers: {
        Authorization: `Bearer ${process.env.BALLDONTLIE_API_KEY}`
      },
      params: {
        per_page: 100,
        team_ids: [teamId]  // <-- THIS is the magic
      }
    });

    const games = response.data.data;

    res.json(games);
  } catch (err) {
    console.error("Games route error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

module.exports = router;
