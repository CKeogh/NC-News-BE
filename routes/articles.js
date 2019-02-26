const articlesRouter = require('express').Router();
const {
  sendArticles,
  receiveArticle,
  sendArticleById,
  receiveArticleById,
} = require('../controllers/articles');

articlesRouter.route('/')
  .get(sendArticles)
  .post(receiveArticle);

articlesRouter.route('/:article_id')
  .get(sendArticleById)
  .patch(receiveArticleById);

module.exports = articlesRouter;
