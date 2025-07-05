const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/search", async (req, res) => {
  try {
    const { search } = req.query;
    const resp = await axios.get("https://www.balldontlie.io/api/v1/games", {
      params: {
        "team_ids[]": search,
        per_page: 25
      }
    });
    res.json(resp.data);
  } catch (err) {
    console.error("Error fetching games:", err);
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

module.exports = router;