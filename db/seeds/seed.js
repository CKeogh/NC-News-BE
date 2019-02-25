const {
  articleData, commentData, topicData, userData,
} = require('../data');

exports.seed = (connection, Promise) => connection.migrate.rollback()
  .then(() => connection.migrate.latest())
  .then(() => connection('topics').insert(topicData).returning('*'));
//   .then((topics) => {
//     const topicRef = createRef();
//     connection('users').insert(userData).returning('*');
//   });
