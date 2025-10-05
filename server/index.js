require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

// Import routes
const teamsRoute = require('./routes/teams');
const playersRoute = require('./routes/players');
const gamesRoute = require('./routes/games');

// Middleware
app.use(express.json());

// API routes
app.use('/api/teams', teamsRoute);
app.use('/api/players', playersRoute);
app.use('/api/games', gamesRoute);

// Serve frontend (React build)
const clientDistPath = path.join(__dirname, 'client_dist', 'dist');
app.use(express.static(clientDistPath));

// Fallback: always send React index.html for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Port config
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
