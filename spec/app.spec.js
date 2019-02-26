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
      return request.post('/api/topics')
        .send(reqBody)
        .expect(201)
        .then(({ body }) => {
          expect(body.topic.slug).to.equal('a');
          expect(body.topic.topic_id).to.be.a('number');
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
      xit('PATCH: return status code 201 and update article', () => request.patch('/api/articles/1').expect(201)
        .then(({ body }) => {
          expect(body.article).to.eql({
            article_id: 1,
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: 1542284514171,
            votes: 100,
          });
        }));
    });
  });
});
