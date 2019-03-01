const connection = require('../db/connection');

exports.getArticles = (queries) => {
  const conditions = {};
  if (queries.username) conditions['articles.author'] = queries.username;
  if (queries.topic) conditions['articles.topic'] = queries.topic;
  const order = queries.sort_by || 'created_at';
  const sortOrder = queries.order || 'desc';

  return connection.select('articles.*')
    .count({ comment_count: 'comment_id' })
    .from('articles')
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .groupBy('articles.article_id')
    .where(conditions)
    .orderBy(order, sortOrder);
};

exports.addArticle = newArticle => connection('articles')
  .insert(newArticle)
  .returning('*')
  .then(article => article);

exports.getArticleById = articleId => connection.select('articles.*')
  .count({ comment_count: 'comment_id' })
  .from('articles')
  .leftJoin('comments', 'comments.article_id', 'articles.article_id')
  .groupBy('articles.article_id')
  .where({ 'articles.article_id': articleId })
  .returning('*')
  .then(article => article);

exports.changeArticleVotes = (articleId, voteChange) => {
  voteChange = voteChange || 0;
  return connection.select('articles.*')
    .count({ comment_count: 'comment_id' })
    .from('articles')
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .groupBy('articles.article_id')
    .where({ 'articles.article_id': articleId })
    .increment('votes', voteChange)
    .returning('*')
    .then(article => article);
};
exports.removeArticleById = articleId => connection('articles')
  .where({ article_id: articleId })
  .del();
