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
        per_page: 100
      }
    });

    let players = response.data.data;

    if (search) {
      players = players.filter(
        player =>
          player.first_name.toLowerCase().includes(search) ||
          player.last_name.toLowerCase().includes(search)
      );
    }

    res.json(players);
  } catch (err) {
    console.error('Error fetching players:', err);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

module.exports = router;
