const topicsRouter = require('express').Router();
const { sendTopics, receiveTopic } = require('../controllers/topics');

topicsRouter.route('/')
  .get(sendTopics)
  .post(receiveTopic);

module.exports = topicsRouter;
