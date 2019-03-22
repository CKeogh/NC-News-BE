const {
  changeCommentVotes,
  getCommentsByArticleId,
  addNewComment,
  removeCommentById,
} = require('../models/comments');
const { getArticleById } = require('../models/articles');

exports.sendCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;

  if (Number.isNaN(+article_id)) {
    return next({ msg: 'Bad request' });
  }

  return getArticleById(article_id)
    .then(([article]) => article)
    .then((article) => {
      if (!article) return article;
      return getCommentsByArticleId(article_id, req.query);
    })
    .then((comments) => {
      if (!comments) next({ msg: 'Page not found' });
      else res.status(200).send({ comments });
    })
    .catch(next);
};

exports.receiveNewComment = (req, res, next) => {
  const { article_id } = req.params;

  if (Number.isNaN(+article_id)) {
    return next({ msg: 'Bad request' });
  }

  const { body, username } = req.body;

  if (!body || !username) {
    return next({ msg: 'Bad request' });
  }
  return addNewComment({ body, author: username, article_id })
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.updateCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const inc_votes = req.body.inc_votes || 0;

  if (typeof inc_votes !== 'number') {
    next({ msg: 'Bad request' });
  } else {
    changeCommentVotes(comment_id, inc_votes)
      .then(([comment]) => {
        if (!comment) {
          next({ msg: 'Page not found' });
        } else {
          res.status(200).send({ comment });
        }
      })
      .catch(next);
  }
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  removeCommentById(comment_id)
    .then(() => {
      res.sendStatus(204);
    });
};
