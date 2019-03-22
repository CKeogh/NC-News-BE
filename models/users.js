const connection = require('../db/connection');

exports.getUsers = () => connection('users')
  .select('*');

exports.addUser = newUser => connection('users')
  .insert(newUser)
  .returning('*');

exports.getUserByUsername = username => connection('users')
  .select('*')
  .where({ username });
