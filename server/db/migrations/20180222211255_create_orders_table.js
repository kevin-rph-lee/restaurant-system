exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', function(table) {
    table.increments('id').primary();
    table.integer('user_id');
    table.dateTime('finish_time');
    table.string('customer_notes');
    table.decimal('total_order_price');
  });
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
