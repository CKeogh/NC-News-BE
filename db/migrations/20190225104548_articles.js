
exports.up = function (knex, Promise) {
  return knex.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id');
    articlesTable.string('title').notNullable();
    articlesTable.string('body', 500);
    articlesTable.integer('votes');
    articlesTable.integer('topic_id').references('topic_id')
      .inTable('topics');
    articlesTable.integer('author_id').references('user_id')
      .inTable('users');
    articlesTable.date('created_at');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('articles');
};
