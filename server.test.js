/* eslint-disable no-undef */
import '@babel/polyfill';
import request from 'supertest';
import app from './server';

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./platform/knexfile')[environment];
// eslint-disable-next-line import/order
const database = require('knex')(configuration);

describe('Server', () => {
  beforeEach(async () => {
    await database.seed.run();
  });
  describe('init', () => {
    it('should return a 200 status', async () => {
      const res = await request(app).get('/api/v1/users');
      expect(res.status).toBe(200);
    });
  });
});
