const express = require('express');
const router = express.Router();
const axios = require('axios');

// Player Search Endpoint
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    const response = await axios.get('https://api.balldontlie.io/v1/players', {
      params: { search },
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer a2da85e3-69c6-4df9-af23-34631bc0fd23'
      }
    });

    res.json(response.data.data || []);
  } catch (error) {
    console.error("Error fetching players:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch players',
      details: error.response?.data || error.message
    });
  }
});

module.exports = router;
