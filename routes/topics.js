const topicsRouter = require('express').Router();

topicsRouter.route('/')
  .get((req, res, next) => {
    res.status(200).send({ msg: 'all Good' });
  })
  .post((req, res, next) => {

  });

module.exports = topicsRouter;
