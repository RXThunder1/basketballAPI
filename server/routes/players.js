const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    const response = await axios.get('https://api.balldontlie.io/v1/players', {
      params: { search }
    });
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching players:', error.message);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

module.exports = router;
