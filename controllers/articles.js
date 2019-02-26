const { getArticles } = require('../models/articles');

exports.sendArticles = (req, res, next) => {
  getArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    });
};

exports.receiveArticles = (req, res, next) => {
  res.status(201).send({ OK: true });
};

exports.sendArticleById = (req, res, next) => {
  res.status(200).send({ article: { OK: true } });
};
