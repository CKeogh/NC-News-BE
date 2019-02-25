
exports.up = function (knex, Promise) {
  return knex.schema.createTable('topics', (topicsTable) => {
    topicsTable.increments('topic_id');
    topicsTable.string('slug').notNullable();
    topicsTable.string('description');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('topics');
};
