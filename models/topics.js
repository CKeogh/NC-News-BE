const connection = require('../db/connection');

exports.getTopics = () => connection('topics')
  .select('*');

exports.addTopic = newTopic => connection('topics')
  .insert(newTopic)
  .returning('*');

exports.getAllSlugs = () => connection.select('slug')
  .from('topics')
  .then(slugs => slugs.map(slug => slug.slug));
