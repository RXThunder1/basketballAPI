const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.BALLDONTLIE_API_KEY;

router.get('/', async (req, res) => {
  try {
    const { search } = req.query;

    if (!search || search.trim() === '') {
      return res.json([]); // Return empty array if no search query
    }

    const response = await axios.get('https://api.balldontlie.io/v1/players', {
      params: { search },
      headers: { Authorization: `Bearer ${API_KEY}` }
    });

    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching players:', error.message);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

module.exports = router;
