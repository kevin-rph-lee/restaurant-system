exports.up = function(knex, Promise) {
  return knex.schema.createTable('menu_items', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.decimal('price');
    table.string('image');
    table.string('description');
    table.string('type');
    table.integer('prep_time');
    table.boolean('sold_out')
  });
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTable('menu_items');
};
