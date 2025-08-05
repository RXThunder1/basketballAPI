const express = require('express');
const router = express.Router();
const axios = require('axios');

// Game Search Endpoint
router.get('/', async (req, res) => {
  try {
    const { dates, team_ids, seasons } = req.query; // optional filters
    const response = await axios.get('https://api.balldontlie.io/v1/games', {
      params: {
        dates,
        team_ids,
        seasons
      },
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer a2da85e3-69c6-4df9-af23-34631bc0fd23'
      }
    });

    res.json(response.data.data || []);
  } catch (error) {
    console.error("Error fetching games:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch games',
      details: error.response?.data || error.message
    });
  }
});

module.exports = router;
