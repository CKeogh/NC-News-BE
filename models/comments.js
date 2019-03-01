const connection = require('../db/connection');

exports.getCommentsByArticleId = (articleId, queries) => {
  const order = queries.sort_by || 'created_at';

  const sortOrder = queries.order || 'desc';

  return connection.select('comments.author', 'comments.body', 'comment_id', 'comments.created_at', 'comments.votes')
    .from('articles')
    .join('comments', 'comments.article_id', 'articles.article_id')
    .join('users', 'comments.author', 'users.username')
    .where({ 'articles.article_id': articleId })
    .orderBy(order, sortOrder);
};

exports.addNewComment = newComment => connection('comments')
  .insert(newComment)
  .returning('*')
  .then(comment => comment);

exports.changeCommentVotes = (commentId, voteChange) => connection('comments');
