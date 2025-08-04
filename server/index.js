const express = require('express');
const cors = require('cors');
const playersRoute = require('./routes/players');
const teamsRoute = require('./routes/teams');
const gamesRoute = require('./routes/games');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/players', playersRoute);
app.use('/api/teams', teamsRoute);
app.use('/api/games', gamesRoute);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
