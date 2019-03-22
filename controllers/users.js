const { getUsers, addUser, getUserByUsername } = require('../models/users');

exports.sendUsers = (req, res, next) => {
  getUsers()
    .then((users) => {
      res.status(200).send({ users });
    });
};

exports.receiveUser = (req, res, next) => {
  const newUser = req.body;
  addUser(newUser)
    .then(([user]) => {
      res.status(201).send({ user });
    });
};

exports.sendUserByUsername = (req, res, next) => {
  const { username } = req.params;
  getUserByUsername(username)
    .then(([user]) => {
      res.status(200).send({ user });
    });
};
