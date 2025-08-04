const axios = require('axios');

test('should fetch players from API', async () => {
  const response = await axios.get('https://api.balldontlie.io/v1/players', { params: { search: 'lebron' } });
  expect(response.status).toBe(200);
  expect(response.data.data).toBeInstanceOf(Array);
});
