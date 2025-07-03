const request = require('supertest');
const express = require('express');
const app = express();

app.use('/api/players', require('../routes/players'));

test('GET /api/players returns array', async () => {
  const res = await request(app).get('/api/players?search=lebron');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});
