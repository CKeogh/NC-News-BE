
exports.up = function (knex, Promise) {
  return knex.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id');
    articlesTable.string('title').notNullable();
    articlesTable.string('body', 2000);
    articlesTable.integer('votes').defaultTo(0);
    articlesTable.integer('topic_id').references('topic_id')
      .inTable('topics');
    articlesTable.integer('user_id').references('user_id')
      .inTable('users');
    articlesTable.date('created_at');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('articles');
};
