const connection = require('../db/connection');

exports.getTopics = () => connection('topics')
  .select('*');

exports.addTopic = newTopic => connection('topics')
  .insert(newTopic)
  .returning('*')
  .then((topic) => {
  });
