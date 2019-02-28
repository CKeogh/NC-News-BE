const {
  getArticles,
  addArticle,
  getArticleById,
  changeArticleVotes,
  removeArticleById,
  addNewComment,
} = require('../models/articles');

exports.sendArticles = (req, res, next) => {
  const queries = req.query;
  getArticles(queries)
    .then((articles) => {
      if (articles.length === 0) return Promise.reject({ status: 404, msg: 'not a valid query', code: '1' });
      res.status(200).send({ articles });
      return null;
    })
    .catch(next);
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
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.updateArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  changeArticleVotes(article_id, inc_votes)
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

exports.receiveNewComment = (req, res, next) => {
  const { article_id } = req.params;
  const { body, username } = req.body;
  addNewComment({ body, author: username, article_id })
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
