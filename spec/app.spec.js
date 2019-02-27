process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app.js');
const connection = require('../db/connection.js');

const request = supertest(app);

describe.only('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  it('bad url should return 404 with error message', () => request.get('/bad-url')
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).to.equal('Page not found');
    }));

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
    it('ERROR: should return status code 400 if post request with invalid data', () => {
      const reqBody = { baba: 1 };
      return request.post('/api/topics')
        .send(reqBody)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Bad request');
        });
    });
    it('ERROR: should return status code 405 if receiving a patch / delete request', () => request.patch('/api/topics')
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).to.equal('Method not allowed');
      }));
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
    it('ERROR: should return status code 404 if given incorrect query', () => request.get('/api/articles?topic=bananas')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.equal('not a valid query');
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
    it('ERROR: should return status code 400 if given invalid data to post', () => {
      const reqBody = {};
      return request.post('/api/articles')
        .send(reqBody)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Bad request');
        });
    });
    it('ERROR: should return status code 405 if patch/delete request made', () => request.delete('/api/articles')
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).to.equal('Method not allowed');
      }));

    describe('/:article_id', () => {
      it('GET: return status code 200 and article from given id', () => request.get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.have.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count');
        }));
      it('PATCH: returns status code 200 and updated article with votes incremented by amount in body', () => request.patch('/api/articles/1')
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.have.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes');// , 'comment_count');
          expect(body.article.votes).to.equal(101);
        }));
      it('DELETE: return 204 status code and delete article by id', () => request.delete('/api/articles/1')
        .expect(204));
      it('ERROR: should return 404 code if no article with given id found for delete request', () => request.delete('/api/articles/99999')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('no article to delete');
        }));
    });
  });
});
