const { getArticles, addArticle } = require('../models/articles');

exports.sendArticles = (req, res, next) => {
  getArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    });
};

exports.receiveArticles = (req, res, next) => {
  const newArticle = req.body;
  addArticle(newArticle)
    .then((article) => {
      res.status(201).send({ article });
    });
};

exports.sendArticleById = (req, res, next) => {
  res.status(200).send({ article: { OK: true } });
};

exports.receiveArticleById = (req, res, next) => {
  res.status(201).send({ mg: 'OK' });
};
