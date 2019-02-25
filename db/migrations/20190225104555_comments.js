
exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id');
    commentsTable.integer('created_by').references('user_id')
      .inTable('users');
    commentsTable.integer('belongs_to').references('article_id')
      .inTable('articles');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.date('created_at');
    commentsTable.string('body', 500);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comments');
};
