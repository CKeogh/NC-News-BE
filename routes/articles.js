const articlesRouter = require('express').Router();

articlesRouter.route('/')
  .get((req, res, next) => {
    res.status(200).send({ msg: 'all Good' });
  })
  .post((req, res, next) => {
    res.status(200).send({ msg: 'all good' });
  });

module.exports = articlesRouter;
