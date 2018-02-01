import server from '../src/main';
const request = require('supertest');



afterAll(() => {
  server.close();
});

describe('server API', () => {
    test('Get Info', async () => {
      let res = await request(server).get('/resume/info');
      console.log(res.body);
      expect(res.body).not.toBeNull();
    })
});

