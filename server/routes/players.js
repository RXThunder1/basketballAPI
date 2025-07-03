const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const search = req.query.search || '';  // ✅ fallback to empty string if nothing provided
    console.log('Search term:', search);    // 🪵 helps debug in Render logs

    const resp = await axios.get('https://www.balldontlie.io/api/v1/players', {
      params: { search }
    });

    res.json(resp.data.data);  // ✅ send only the data array
  } catch (err) {
    console.error('Error fetching players:', err.message);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

module.exports = router;
