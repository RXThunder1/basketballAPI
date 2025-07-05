const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/search", async (req, res) => {
  try {
    const resp = await axios.get("https://www.balldontlie.io/api/v1/teams");
    const { search } = req.query;
    const results = resp.data.data.filter(team =>
      team.full_name.toLowerCase().includes(search.toLowerCase())
    );
    res.json({ data: results });
  } catch (err) {
    console.error("Error fetching teams:", err);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});

module.exports = router;