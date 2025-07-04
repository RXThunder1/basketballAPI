const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const search = req.query.search || '';
  console.log(`→ Searching players with term: "${search}"`);
  const apiUrl = `https://www.balldontlie.io/api/v1/players?search=${encodeURIComponent(search)}`;

  try {
    const resp = await axios.get(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });
    console.log(`✅ API call succeeded with ${resp.data.data.length} results`);
    res.json(resp.data.data);
  } catch (err) {
    console.error('❌ FULL ERROR:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'Failed to fetch players', detail: err.message });
  }
});

module.exports = router;
