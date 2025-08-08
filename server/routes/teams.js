const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.BALLDONTLIE_API_KEY;

router.get('/', async (req, res) => {
  try {
    const { search } = req.query;

    // The teams endpoint does not support search parameter, so do manual filtering after fetch
    const response = await axios.get('https://api.balldontlie.io/v1/teams', {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });

    let teams = response.data.data;

    if (search && search.trim() !== '') {
      const searchLower = search.toLowerCase();
      teams = teams.filter(team => 
        team.full_name.toLowerCase().includes(searchLower) || 
        team.abbreviation.toLowerCase().includes(searchLower)
      );
    }

    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error.message);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

module.exports = router;
