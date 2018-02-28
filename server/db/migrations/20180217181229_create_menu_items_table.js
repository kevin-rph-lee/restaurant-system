exports.up = function(knex, Promise) {
  return knex.schema.createTable('menu_items', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.decimal('price');
    table.string('image');
    table.string('description');
    table.string('type');
  });
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTable('menu_items');
};
