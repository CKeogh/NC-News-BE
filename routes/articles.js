const articlesRouter = require('express').Router();
const {
  sendArticles,
  receiveArticle,
  sendArticleById,
  updateArticleVotes,
} = require('../controllers/articles');

articlesRouter.route('/')
  .get(sendArticles)
  .post(receiveArticle);

articlesRouter.route('/:article_id')
  .get(sendArticleById)
  .patch(updateArticleVotes);

module.exports = articlesRouter;
