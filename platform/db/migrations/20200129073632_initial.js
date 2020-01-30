
exports.up = function(knex) {
  return knex.schema
  .createTable('users', table => {
    table.increments('id').primary();
    table.string('username');
    table.string('handle');
    table.integer('followers');
    table.integer('following');
    table.timestamps(true, true);
  })
  .createTable('tweets', table => {
    table.increments('id').primary();
    table.string('content');
    table.string('date');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('tweets')
    .dropTable('users')
};
