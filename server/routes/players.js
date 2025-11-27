const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const search = req.query.search?.toLowerCase();
  const url = 'https://api.balldontlie.io/v1/players';

  try {
    console.log(`Incoming player search: "${search}"`);
    console.log(`Using API key: ${process.env.BALLDONTLIE_API_KEY ? '✅ Loaded' : '❌ MISSING'}`);

    const response = await axios.get(url, {
      headers: {
        Authorization: process.env.BALLDONTLIE_API_KEY, // make sure your .env includes Bearer
      },
      params: {
        per_page: 100,
        search: search || '' // <-- include search param properly
      }
    });

    console.log(`✅ BallDontLie response status: ${response.status}`);
    console.log(`✅ Players received: ${response.data.data.length}`);

    res.json(response.data.data || []);
  } catch (err) {
    console.error('❌ Full error from BallDontLie:', err.response?.status, err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

module.exports = router;
