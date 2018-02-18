exports.seed = function(knex, Promise) {
  return knex('menu_items').del()
    .then(function () {
      return Promise.all([
         knex('menu_items').insert({name: 'Hamburger', price: 1.00}),
         knex('menu_items').insert({name: 'Fries', price: 2.00}),
         knex('menu_items').insert({name: 'Shakes', price: 3.00}),
      ]);
    });
};