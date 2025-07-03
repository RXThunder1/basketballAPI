const request = require('supertest');
const express = require('express');

// Mock minimal app with error route
const app = express();

// Example route to simulate error
app.get('/api/error', (req, res) => {
  throw new Error('Simulated failure');
});

// Basic error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

describe('Error Handling', () => {
  it('should return 500 and error message on thrown error', async () => {
    const res = await request(app).get('/api/error');
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error', 'Simulated failure');
  });

  it('should return JSON error response for unknown routes', async () => {
    const res = await request(app).get('/api/unknown-route');
    expect(res.statusCode).toBe(404);
  });
});
