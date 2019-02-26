const connection = require('../db/connection');
const { createRefTable, formatArticles } = require('../db/utils/seedFunctions');

// SELECT articles.*, COUNT(comment_id) AS comment_count
//     FROM articles
//     JOIN comments ON comments.article_id = articles.article_id
//     GROUP BY articles.article_id;

exports.getArticles = (queries) => {
  const conditions = {};
  if (queries.username) conditions['articles.author'] = queries.username;
  if (queries.topic) conditions['articles.topic'] = queries.topic;

  return connection.select('articles.*')
    .count({ comment_count: 'comment_id' })
    .from('articles')
    .join('comments', 'comments.article_id', 'articles.article_id')
    .groupBy('articles.article_id')
    .where(conditions);
};
exports.addArticle = newArticle => connection('articles')
  .insert(newArticle)
  .returning('*')
  .then(article => article[0]);
