const express = require("express");
const path = require("path");
const app = express();
const playersRoute = require("./routes/players");
const teamsRoute = require("./routes/teams");
const gamesRoute = require("./routes/games");

app.use(express.static(path.join(__dirname, "client_dist")));
app.use(express.json());

app.use("/api/players", playersRoute);
app.use("/api/teams", teamsRoute);
app.use("/api/games", gamesRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client_dist", "index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));