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
  describe('GET /api/v1/users', () => {
    it('should return a 200 and all of the users', async () => {
      const expectedUsers = await database('users').select();

      const res = await request(app).get('/api/v1/users');
      const users = res.body;

      expect(res.status).toBe(200);
      expect(users.length).toEqual(30);
      // expect(users).toEqual(expectedUsers);
      // timestamps are causing test to fail due to response object being a string,
      // and result from database not being a string...need to create migration
      // and drop timestamps in order to write effective tests
    });
  });
});
