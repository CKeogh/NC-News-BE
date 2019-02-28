const { changeCommentVotes, getCommentsByArticleId } = require('../models/comments');

exports.sendCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  getCommentsByArticleId(article_id, req.query)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.updateCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body.inc_votes;
  changeCommentVotes(comment_id, inc_votes)
    .then(([comment]) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};
