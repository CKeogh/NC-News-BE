const articlesRouter = require('express').Router();
const {
  sendArticles,
  receiveArticles,
  sendArticleById,
} = require('../controllers/articles');

articlesRouter.route('/')
  .get(sendArticles)
  .post(receiveArticles);

articlesRouter.route('/:article_id')
  .get(sendArticleById);

module.exports = articlesRouter;
