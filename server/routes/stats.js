const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const resp = await axios.get('https://www.balldontlie.io/api/v1/stats', {
      params: req.query
    });
    res.json(resp.data.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
