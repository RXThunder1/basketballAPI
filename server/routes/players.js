const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/search', async (req, res) => {
  const search = req.query.search || '';
  const url = `https://balldontlie.io/api/v1/players?search=${encodeURIComponent(search)}`;
  console.log(`→ Proxying player search: "${search}" → ${url}`);

  try {
    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    console.log(`✅ Player data returned with ${response.data.data.length} results`);
    res.json(response.data.data);
  } catch (error) {
    console.error('❌ Error while fetching players:', {
      status: error.response?.status,
      data: error.response?.data,
    });

    res.status(500).json({
      error: 'Failed to fetch players',
      detail: error.message,
      apiError: error.response?.data || null
    });
  }
});

module.exports = router;
