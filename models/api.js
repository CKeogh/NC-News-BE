
exports.getAllEndPoints = () => {
  const api = {
    '/api/topics': {
      GET: {
        description: 'serves up all topics in database',
        return: 'array of topics with keys slug, description',
      },
      POST: {
        desciption: 'adds a new topic to database',
        returns: 'the newly added topic',
        expects: 'object with keys slug (must be unique), description',
      },
    },
    '/api/articles': {
      GET: {
        description: 'serves up all articles in database',
        return: 'array of articles with keys title, topic, author, body, created_at, votes',
        queries: {
          username: 'valid username',
          topic: 'valid topic',
          sort_by: 'arranges in order of a valid key',
          order: 'defines sort_by as asc or desc',
        },
      },
      POST: {
        description: 'adds a new article to the database',
        returns: 'newly added article',
        expects: 'object with keys title, body, topic, author',
      },
    },
    '/api/articles/:article_id': {
      GET: {
        description: 'serves up an article by its id',
        returns: 'single article object with keys title, topic, author, body, created_at, votes',
      },
      PATCH: {
        description: 'increments or decrements article votes for article_id',
        returns: 'the modified article',
        expects: 'object with key inc_votes which should be a number',
      },
      DELETE: {
        description: 'deletes article by id',
        returns: 'nothing',
      },
    },
    '/api/articles/:article_id/comments': {
      GET: {
        description: 'serves up an array of comments for article_id',
        returns: 'array of objects with keys comment_id, votes, created_at, author, body',
        queries: {
          sort_by: 'orders comments by key',
          order: 'defines order of sort_by as asc or desc',
        },
      },
      POST: {
        description: 'adds a new comment to article_id',
        returns: 'newly added comment',
        expects: 'object with keys username, body',
      },
    },
    '/api/comments/:comment_id': {

    },
  };
};
