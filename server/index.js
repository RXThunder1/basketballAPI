const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// --- API routes ---
app.use('/api/players', require('./routes/players'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/games', require('./routes/games'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/season-averages', require('./routes/seasonAverages'));

// --- Serve React static files ---
app.use(express.static(path.join(__dirname, 'client_dist')));

// --- Handle React routing, return index.html ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client_dist', 'index.html'));
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
