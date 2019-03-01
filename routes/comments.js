const commentsRouter = require('express').Router();
const { updateCommentVotes, deleteCommentById } = require('../controllers/comments');
const { handle405 } = require('../errors');

commentsRouter.route('/:comment_id')
  .patch(updateCommentVotes)
  .delete(deleteCommentById)
  .all(handle405);

module.exports = commentsRouter;
