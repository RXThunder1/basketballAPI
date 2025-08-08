const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.BALLDONTLIE_API_KEY;

router.get('/', async (req, res) => {
  try {
    const { date, team } = req.query;

    const params = {};
    if (date) params['dates[]'] = date;  // filter by date if provided
    if (team) params.team_ids = team;    // filter by team ID if provided

    const response = await axios.get('https://api.balldontlie.io/v1/games', {
      params,
      headers: { Authorization: `Bearer ${API_KEY}` }
    });

    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching games:', error.message);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

module.exports = router;
