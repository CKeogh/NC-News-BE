exports.createRefTable = (arrayOfObjects, name, id) => arrayOfObjects.reduce((endObj, currObj) => {
  endObj[currObj[name]] = currObj[id];
  return endObj;
}, {});

exports.formatArticles = (articles, topicRef, userRef) => articles.map(article => ({
  topic_id: topicRef[article.topic],
  article_id: article.article_id,
  title: article.title,
  user_id: userRef[article.author],
  body: article.body,
  votes: article.votes,
  created_at: article.created_at,
}));
