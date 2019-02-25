const {
  articleData, commentData, topicData, userData,
} = require('../data');
const { createRefTable } = require('../utils/seedFunctions.js');

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
    // const reformattedArticles =
    const insertedArticles = connection('articles').insert(articleData);
  });
