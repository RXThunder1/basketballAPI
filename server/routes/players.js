const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const search = req.query.search?.toLowerCase();
  const url = 'https://api.balldontlie.io/v1/players';

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.BALLDONTLIE_API_KEY}`
      },
      params: {
        per_page: 100 // get a large enough sample to filter locally
      }
    });

    let players = response.data.data;

    // Filter by search query if provided
    if (search) {
      players = players.filter(player =>
        `${player.first_name} ${player.last_name}`.toLowerCase().includes(search) ||
        player.team.full_name.toLowerCase().includes(search)
      );
    }

    res.json({ data: players });
  } catch (err) {
    console.error('Error fetching players:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

module.exports = router;
