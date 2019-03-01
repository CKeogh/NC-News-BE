const {
  getArticles,
  addArticle,
  getArticleById,
  changeArticleVotes,
  removeArticleById,
  getArticleColumns,
} = require('../models/articles');

exports.sendArticles = (req, res, next) => {
  const queries = req.query;
  getArticleColumns()
    .then((columns) => {
      if (!columns.includes(queries.sort_by)) queries.sort_by = 'created_at';
      return getArticles(queries);
    })
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
  const { article_id } = req.params;
  getArticleById(article_id)
    .then(([article]) => {
      if (!article) next({ msg: 'article does not exist' });
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.updateArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const inc_votes = req.body.inc_votes || 0;

  if (typeof inc_votes !== 'number') {
    return next({ msg: 'Bad request' });
  }
  return changeArticleVotes(article_id, inc_votes)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.deleteArticleById = (req, res, next) => {
  const { article_id } = req.params;
  removeArticleById(article_id)
    .then((delCount) => {
      if (delCount === 0) return Promise.reject({ status: 404, msg: 'no article to delete', code: '2' });
      res.sendStatus(204);
      return null;
    })
    .catch(next);
};
