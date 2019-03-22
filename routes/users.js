const usersRouter = require('express').Router();
const { sendUsers, receiveUser, sendUserByUsername } = require('../controllers/users');

usersRouter.route('/')
  .get(sendUsers)
  .post(receiveUser);

usersRouter.route('/:username')
  .get(sendUserByUsername);

module.exports = usersRouter;
