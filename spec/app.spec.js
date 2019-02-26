process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app.js');
const connection = require('../db/connection.js');

const request = supertest(app);

describe.only('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/topics', () => {
    it('GET: return status code 200 and array of topics', () => request.get('/api/topics').expect(200)
      .then(({ body }) => {
        expect(body.topics[0]).to.have.keys('topic_id', 'slug', 'description');
      }));
    it('POST: add topic and return status code 201', () => {
      const reqBody = { slug: 'a', description: 'xxx' };
      return request.post('/api/topics').expect(201)
        .send(reqBody)
        .then(({ body }) => {
        });
    });
  });

  describe('/articles', () => {
    it('GET: return status code 200 and array of articles', () => request.get('/api/articles').expect(200)
      .then(({ body }) => {
        expect(body.articles[0]).to.have.keys('title', 'topic_id', 'user_id', 'body', 'created_at', 'votes', 'article_id');
      }));
    it('POST: return status code 201', () => request.post('/api/articles').expect(201));

    describe('/:article_id', () => {
      it('GET: return status code 200 and article from given id', () => request.get('/api/articles/1').expect(200));
    });
  });
});
