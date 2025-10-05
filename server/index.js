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

// Optional: a simple root route for health check or basic info
app.get('/', (req, res) => {
  res.send('Basketball API Proxy is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
