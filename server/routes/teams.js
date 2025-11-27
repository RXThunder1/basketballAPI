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

    if (search) {
      teams = teams.filter(team => team.full_name.toLowerCase().includes(search));
    }

    res.json(teams || []);
  } catch (err) {
    console.error('Error fetching teams:', err);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

module.exports = router;
