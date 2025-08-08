require('dotenv').config();
const express = require('express');
const path = require('path');
const playersRouter = require('./routes/players');
const teamsRouter = require('./routes/teams');
const gamesRouter = require('./routes/games');

const app = express();
const PORT = process.env.PORT || 10000;

// Serve static React build files
app.use(express.static(path.join(__dirname, 'client_dist')));

// API routes
app.use('/api/players', playersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/games', gamesRouter);

// Catch-all to serve React app for any unknown routes (for client side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client_dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
