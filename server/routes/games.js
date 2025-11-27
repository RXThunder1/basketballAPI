const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const search = req.query.search?.toLowerCase();
  const url = 'https://api.balldontlie.io/v1/games';

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: process.env.BALLDONTLIE_API_KEY
      },
      params: {
        per_page: 100
      }
    });

    let games = response.data.data;

    if (search) {
      games = games.filter(
        game =>
          game.home_team.full_name.toLowerCase().includes(search) ||
          game.visitor_team.full_name.toLowerCase().includes(search)
      );
    }

    res.json(games || []);
  } catch (err) {
    console.error('Error fetching games:', err);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

module.exports = router;
