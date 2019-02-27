const topicsRouter = require('express').Router();
const { sendTopics, receiveTopic } = require('../controllers/topics');
const { handle405 } = require('../errors');

topicsRouter.route('/')
  .get(sendTopics)
  .post(receiveTopic)
  .all(handle405);

module.exports = topicsRouter;
