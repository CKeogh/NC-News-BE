const apiRouter = require('express').Router();
const topicsRouter = require('./topics.js');
const articlesRouter = require('./articles.js');
const commentsRouter = require('./comments.js');

apiRouter.use('/topics', topicsRouter);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;
