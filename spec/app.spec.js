process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app.js');
const connection = require('../db/connection.js');

const request = supertest(app);

describe('/api', () => {
  after(() => connection.destroy());
  describe('/topics', () => {
    it('GET: return status code 200', () => request.get('/api/topics').expect(200));
  });
});
