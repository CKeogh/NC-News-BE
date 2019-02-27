const {
  getArticles,
  addArticle,
  getArticleById,
  changeArticleVotes,
  removeArticleById,
} = require('../models/articles');

exports.sendArticles = (req, res, next) => {
  const queries = req.query;
  getArticles(queries)
    .then((articles) => {
      res.status(200).send({ articles });
    });
};

exports.receiveArticle = (req, res, next) => {
  const newArticle = req.body;
  addArticle(newArticle)
    .then(([article]) => {
      res.status(201).send({ article });
    })
    .catch(next);
};

exports.sendArticleById = (req, res, next) => {
  const articleId = req.params.article_id;
  getArticleById(articleId)
    .then(([article]) => {
      res.status(200).send({ article });
    });
};

exports.updateArticleVotes = (req, res, next) => {
  const articleId = req.params.article_id;
  const voteChange = req.body.inc_votes;

  changeArticleVotes(articleId, voteChange)
    .then(([article]) => {
      res.status(200).send({ article });
    });
};

exports.deleteArticleById = (req, res, next) => {
  const articleId = req.params.article_id;
  removeArticleById(articleId)
    .then((delCount) => {
      if (delCount === 0) return Promise.reject({ status: 404, msg: 'no article to delete', code: '23502' });
      res.sendStatus(204);
      return null;
    })
    .catch(next);
};
