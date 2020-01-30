
exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('followers');
    table.dropColumn('following');
  })
};


exports.down = function(knex) {
  return knex.schema.table('users', table => {
    table.integer('followers');
    table.integer('following');
  })
};
