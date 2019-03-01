const usersRouter = require('express').Router();
const { sendUsers, receiveUser } = require('../controllers/users');

usersRouter.route('/')
  .get(sendUsers)
  .post(receiveUser);

module.exports = usersRouter;
