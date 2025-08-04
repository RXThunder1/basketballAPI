const axios = require('axios');

test('should return error for invalid endpoint', async () => {
  try {
    await axios.get('https://api.balldontlie.io/v1/invalidendpoint');
  } catch (error) {
    expect(error.response.status).toBe(404);
  }
});
