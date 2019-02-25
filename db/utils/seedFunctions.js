const createRefTable = (arrayOfObjects, name, id) => arrayOfObjects.reduce((endObj, currObj) => {
  endObj[currObj[name]] = currObj[id];
  return endObj;
}, {});

const convertDate = timeStamp => new Date(timeStamp);

const formatArticles = (articles, topicRef, userRef) => articles.map(article => ({
  topic_id: topicRef[article.topic],
  article_id: article.article_id,
  title: article.title,
  user_id: userRef[article.author],
  body: article.body,
  votes: article.votes,
  created_at: convertDate(article.created_at),
}));

const formatComments = (comments, userRef, articleRef) => comments.map(comment => ({
  body: comment.body,
  user_id: userRef[comment.created_by],
  votes: comment.votes,
  created_at: convertDate(comment.created_at),
  article_id: articleRef[comment.belongs_to],
}));


module.exports = {
  createRefTable, formatArticles, convertDate, formatComments,
};
