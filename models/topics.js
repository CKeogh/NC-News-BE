const connection = require('../db/connection');

// exports.getTopics = () => connection('topics')
//   .select('*');

exports.getTopics = () => connection.select('topics.*')
  .count('articles.topic as article_count')
  .from('topics')
  .leftJoin('articles', 'articles.topic', 'topics.slug')
  .groupBy('topics.slug');


exports.addTopic = newTopic => connection('topics')
  .insert(newTopic)
  .returning('*');

exports.getAllSlugs = () => connection.select('slug')
  .from('topics')
  .then(slugs => slugs.map(slug => slug.slug));
