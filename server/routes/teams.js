const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (_, res) => {
  try {
    const resp = await axios.get('https://www.balldontlie.io/api/v1/teams');
    res.json(resp.data.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

module.exports = router;
