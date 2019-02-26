const articlesRouter = require('express').Router();
const {
  sendArticles,
  receiveArticles,
  sendArticleById,
  receiveArticleById,
} = require('../controllers/articles');

articlesRouter.route('/')
  .get(sendArticles)
  .post(receiveArticles);

articlesRouter.route('/:article_id')
  .get(sendArticleById)
  .patch(receiveArticleById);

module.exports = articlesRouter;
