const connection = require('../db/connection');

exports.getArticles = () => connection('articles').select('*');
