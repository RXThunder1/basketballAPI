require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Import routes (make sure these files have the filtering logic as discussed)
const playersRouter = require('./routes/players');
const teamsRouter = require('./routes/teams');
const gamesRouter = require('./routes/games');

app.use('/players', playersRouter);
app.use('/teams', teamsRouter);
app.use('/games', gamesRouter);

const path = require('path');

// Serve the frontend build
app.use(express.static(path.join(__dirname, 'client_dist', 'dist')));

// Fallback: send index.html for any other route (so React Router works)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client_dist', 'dist', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
