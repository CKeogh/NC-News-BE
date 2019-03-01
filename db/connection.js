const knex = require('knex');
const dbConfig = process.env.NODE_ENV === 'production' ? process.env : require('../knexfile.js');

const connection = knex(dbConfig);

module.exports = connection;
