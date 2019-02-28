const {
  articleData, commentData, topicData, userData,
} = require('../data');
const { createRefTable, formatArticles, formatComments } = require('../utils/seedFunctions.js');

exports.seed = (connection, Promise) => connection.migrate.rollback()
  .then(() => connection.migrate.latest())
  .then(() => connection('topics').insert(topicData).returning('*'))
  .then(() => {
    const insertedUsers = connection('users').insert(userData).returning('*');
    return insertedUsers;
  })
  .then(() => {
    const formattedArticles = formatArticles(articleData);
    const insertedArticles = connection('articles').insert(formattedArticles).returning('*');
    return insertedArticles;
  })
  .then((insertedArticles) => {
    const articleRef = createRefTable(insertedArticles, 'title', 'article_id');
    const formattedComments = formatComments(commentData, articleRef);
    return connection('comments').insert(formattedComments).returning('*');
  });
