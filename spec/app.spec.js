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
        expect(body.topics[0]).to.have.keys('slug', 'description');
      }));
    it('POST: add topic and return status code 201', () => {
      const reqBody = { slug: 'a', description: 'xxx' };
      return request.post('/api/topics')
        .send(reqBody)
        .expect(201)
        .then(({ body }) => {
          expect(body.topic.slug).to.equal('a');
        });
    });
  });

  describe('/articles', () => {
    it('GET: return status code 200 and array of articles', () => request.get('/api/articles').expect(200)
      .then(({ body }) => {
        expect(body.articles[0]).to.have.keys('title', 'topic', 'author', 'body', 'created_at', 'votes', 'article_id', 'comment_count');
        expect(body.articles.length).to.equal(12);
      }));
    it('GET: should filter by username query', () => request.get('/api/articles?username=rogersop')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].author).to.equal('rogersop');
      }));
    it('GET: should filter by topic query', () => request.get('/api/articles?topic=cats')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].topic).to.equal('cats');
      }));
    it('GET: should take sort_by query which defaults to date', () => request.get('/api/articles?sort_by=title')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].title).to.equal('Z');
      }));
    it('GET: should take an order query that specifies asc/desc sort order, defaulting to desc', () => request.get('/api/articles?sort_by=title&order=asc')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].title).to.equal('A');
      }));

    it('POST: return status code 201 and added article', () => {
      const article = {
        title: 'a',
        body: 'xxx',
        topic: 'cats',
        author: 'rogersop',
      };
      return request.post('/api/articles')
        .send(article)
        .expect(201)
        .then(({ body }) => {
          expect(body.article).to.be.an('object');
          expect(body.article).to.have.keys('article_id', 'title', 'body', 'votes', 'topic', 'author', 'created_at');
        });
    });
    describe('/:article_id', () => {
      it('GET: return status code 200 and article from given id', () => request.get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.have.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count');
        }));
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
