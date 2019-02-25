const {
  articleData, commentData, topicData, userData,
} = require('../data');
const { createRefTable, formatArticles, formatComments } = require('../utils/seedFunctions.js');

exports.seed = (connection, Promise) => connection.migrate.rollback()
  .then(() => connection.migrate.latest())
  .then(() => connection('topics').insert(topicData).returning('*'))
  .then((topics) => {
    const topicRef = createRefTable(topics, 'slug', 'topic_id');
    const insertedUsers = connection('users').insert(userData).returning('*');
    return Promise.all([topicRef, insertedUsers]);
  })
  .then(([topicRef, insertedUsers]) => {
    const userRef = createRefTable(insertedUsers, 'username', 'user_id');
    const formattedArticles = formatArticles(articleData, topicRef, userRef);
    const insertedArticles = connection('articles').insert(formattedArticles).returning('*');
    return Promise.all([userRef, insertedArticles]);
  })
  .then(([userRef, insertedArticles]) => {
    const articleRef = createRefTable(insertedArticles, 'title', 'article_id');
    const formattedComments = formatComments(commentData, userRef, articleRef);
    return connection('comments').insert(formattedComments).returning('*');
  })
  .then(() => console.log('Database Seeded!'));
