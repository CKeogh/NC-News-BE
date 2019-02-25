const apiRouter = require('express').Router();
const topicsRouter = require('./topics.js');
const articlesRouter = require('./articles.js');

apiRouter.use('/topics', topicsRouter);

apiRouter.use('/articles', articlesRouter);

module.exports = apiRouter;
