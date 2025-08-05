const express = require('express');
const path = require('path');
const cors = require('cors');

const playersRoute = require('./routes/players');
const teamsRoute = require('./routes/teams');
const gamesRoute = require('./routes/games');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/players', playersRoute);
app.use('/api/teams', teamsRoute);
app.use('/api/games', gamesRoute);

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'client_dist')));

// Handle React routing, return index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client_dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
