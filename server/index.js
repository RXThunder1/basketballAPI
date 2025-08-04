const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());

// API routes
app.use('/api/players', require('./routes/players'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/games', require('./routes/games'));

// Serve frontend files
app.use(express.static(path.join(__dirname, 'client_dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client_dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
