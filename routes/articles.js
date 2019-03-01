const articlesRouter = require('express').Router();
const {
  sendArticles,
  receiveArticle,
  sendArticleById,
  updateArticleVotes,
  deleteArticleById,
} = require('../controllers/articles');

const {
  sendCommentsByArticleId,
  receiveNewComment,
} = require('../controllers/comments');
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
  .delete(deleteArticleById)
  .all(handle405);

articlesRouter.route('/:article_id/comments')
  .get(sendCommentsByArticleId)
  .post(receiveNewComment)
  .all(handle405);

module.exports = articlesRouter;
