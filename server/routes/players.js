const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const search = req.query.search || '';
  console.log(`Incoming search: "${search}"`);
  console.log(`Requesting: https://www.balldontlie.io/api/v1/players?search=${search}`);

  try {
    const resp = await axios.get('https://www.balldontlie.io/api/v1/players', {
      params: { search },
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });
    res.json(resp.data.data);
  } catch (err) {
    console.error('Error fetching players:', err.message);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

module.exports = router;
