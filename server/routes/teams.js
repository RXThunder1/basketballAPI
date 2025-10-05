const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const search = req.query.search?.toLowerCase();
  const url = 'https://api.balldontlie.io/v1/teams';

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.BALLDONTLIE_API_KEY}`
      }
    });

    let teams = response.data.data;

    // Filter by search query if provided
    if (search) {
      teams = teams.filter(team =>
        team.full_name.toLowerCase().includes(search) ||
        team.abbreviation.toLowerCase().includes(search) ||
        team.city.toLowerCase().includes(search)
      );
    }

    res.json({ data: teams }); // consistent structure for frontend
  } catch (err) {
    console.error('Error fetching teams:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

module.exports = router;
