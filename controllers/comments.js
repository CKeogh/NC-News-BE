const { changeCommentVotes, getCommentsByArticleId, addNewComment } = require('../models/comments');
const { getArticleById } = require('../models/articles');

exports.sendCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  getArticleById(article_id)
    .then(([article]) => article)
    .then((article) => {
      if (!article) return article;
      return getCommentsByArticleId(article_id, req.query);
    })
    .then((comments) => {
      if (!comments) next({ msg: 'article does not exist' });
      else res.status(200).send({ comments });
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

exports.updateCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const inc_votes = req.body.inc_votes || 0;
  changeCommentVotes(comment_id, inc_votes)
    .then(([comment]) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};
