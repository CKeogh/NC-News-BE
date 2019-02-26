
exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id');
    commentsTable.string('author').references('username')
      .inTable('users');
    commentsTable.integer('article_id').references('article_id')
      .inTable('articles');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.date('created_at');
    commentsTable.string('body', 500);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comments');
};
