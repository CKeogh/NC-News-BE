const createRefTable = (arrayOfObjects, name, id) => arrayOfObjects.reduce((endObj, currObj) => {
  endObj[currObj[name]] = currObj[id];
  return endObj;
}, {});

const convertDate = timeStamp => new Date(timeStamp);

const formatArticles = articles => articles.map(article => ({
  topic: article.topic,
  article_id: article.article_id,
  title: article.title,
  author: article.author,
  body: article.body,
  votes: article.votes,
  created_at: convertDate(article.created_at),
}));

const formatComments = (comments, userRef, articleRef) => comments.map(comment => ({
  body: comment.body,
  author: comment.created_by,
  votes: comment.votes,
  created_at: convertDate(comment.created_at),
  article_id: articleRef[comment.belongs_to],
}));


module.exports = {
  createRefTable,
  formatArticles,
  convertDate,
  formatComments,
};
