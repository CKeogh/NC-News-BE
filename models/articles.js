const connection = require('../db/connection');
const { createRefTable, formatArticles } = require('../db/utils/seedFunctions');

exports.getArticles = () => connection('articles').select('*');

exports.addArticle = newArticle => connection('articles')
  .insert(newArticle)
  .returning('*')
  .then(article => article[0]);
