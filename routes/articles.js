const articlesRouter = require('express').Router();
const {
  sendArticles,
  receiveArticle,
  sendArticleById,
  updateArticleVotes,
  deleteArticleById,
  sendArticleComments,
  receiveNewComment,
} = require('../controllers/articles');
const {
  handle405,
} = require('../errors');

articlesRouter.route('/')
  .get(sendArticles)
  .post(receiveArticle)
  .all(handle405);

articlesRouter.route('/:article_id')
  .get(sendArticleById)
  .patch(updateArticleVotes)
  .delete(deleteArticleById);

articlesRouter.route('/:article_id/comments')
  .get(sendArticleComments)
  .post(receiveNewComment);

module.exports = articlesRouter;
