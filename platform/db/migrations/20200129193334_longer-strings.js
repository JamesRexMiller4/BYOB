
exports.up = function(knex) {
  return knex.schema.alterTable('tweets', table => {
    table.string('content', 1000).alter();
  })
};

exports.down = function(knex) {
  return knex.schema.table('tweets', table => {
    table.dropColumn('content');
  })
};
