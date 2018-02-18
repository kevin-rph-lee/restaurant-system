exports.seed = function(knex, Promise) {
  return knex('menu_items').del()
    .then(function () {
      return Promise.all([
         knex('menu_items').insert({name: 'Jajangmyeon', price: 1.00, image: '/images/1.jpg', description: 'Korean black bean noodles'}),
         knex('menu_items').insert({name: 'Chow Mein', price: 2.00, image: '/images/2.jpg', description: 'Crispy chinese noodles with meat and veg!'}),
         knex('menu_items').insert({name: 'Pho', price: 3.00, image: '/images/3.jpg', description: 'Pho king good!'}),
         knex('menu_items').insert({name: 'Ramen', price: 4.00, image: '/images/4.jpg', description: 'Rikimaru Ramen, the best ramen from Hanamura'}),
      ]);
    });
};