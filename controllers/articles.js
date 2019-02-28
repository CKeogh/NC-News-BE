const {
  getArticles,
  addArticle,
  getArticleById,
  changeArticleVotes,
  removeArticleById,
  getArticleComments,
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
      if (delCount === 0) return Promise.reject({ status: 404, msg: 'no article to delete', code: '2' });
      res.sendStatus(204);
      return null;
    })
    .catch(next);
};

exports.sendArticleComments = (req, res, next) => {
  const articleId = req.params.article_id;
  getArticleComments(articleId, req.query)
    .then((comments) => {
      res.status(200).send({ comments });
    });
};

exports.receiveNewComment = (req, res, next) => {
  const { article_id } = req.params;
  const { body, username } = req.body;
  addNewComment({ body, author: username, article_id })
    .then(([comment]) => {
      res.status(201).send({ comment });
    });
};
