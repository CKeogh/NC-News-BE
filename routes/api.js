const apiRouter = require('express').Router();
const topicsRouter = require('./topics.js');
const articlesRouter = require('./articles.js');
const commentsRouter = require('./comments.js');
const usersRouter = require('./users.js');

apiRouter.use('/topics', topicsRouter);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentsRouter);

apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
