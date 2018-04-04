exports.seed = function(knex, Promise) {
  return knex('menu_items').del()
    .then(function () {
      return Promise.all([
         knex('menu_items').insert({name: 'Jajangmyeon', price: 6.00, image: '/images/1.jpg', description: 'Korean black bean noodles', type: 'main', prep_time: 15, sold_out: false}),
         knex('menu_items').insert({name: 'Chow Mein', price: 8.00, image: '/images/2.jpg', description: 'Crispy chinese noodles with meat and veg!', type: 'main', prep_time: 25, sold_out: false}),
         knex('menu_items').insert({name: 'Pho', price: 7.00, image: '/images/3.jpg', description: 'Rice noodles with beef', type: 'main', prep_time: 20, sold_out: false}),
         knex('menu_items').insert({name: 'Ramen', price: 10.00, image: '/images/4.jpg', description: 'Rikimaru Ramen, the best ramen from Hanamura', type: 'main', prep_time: 10, sold_out: false}),
         knex('menu_items').insert({name: 'Ramune', price: 4.00, image: '/images/5.jpg', description: 'Japanese soda', type: 'drink', prep_time: 5, sold_out: false}),
         knex('menu_items').insert({name: 'California Roll', price: 3.00, image: '/images/6.jpg', description: 'Sushi from California', type: 'side', prep_time: 10, sold_out: false}),
         knex('menu_items').insert({name: 'Milk bubble tea', price: 3.50, image: '/images/7.jpg', description: 'Give me boba or give me death', type: 'drink', prep_time: 5, sold_out: false}),
         knex('menu_items').insert({name: 'Dim Sum', price: 2.50, image: '/images/8.jpg', description: 'You get one random dim sum dish', type: 'side', prep_time: 10, sold_out: false}),
      ]);
    });
};