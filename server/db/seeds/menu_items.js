exports.seed = function(knex, Promise) {
  return knex('menu_items').del()
    .then(function () {
      return Promise.all([
         knex('menu_items').insert({name: 'Jajangmyeon', price: 6.00, image: '/images/1.jpg', description: 'Korean black bean noodles', type: 'main', prep_time: 15}),
         knex('menu_items').insert({name: 'Chow Mein', price: 8.00, image: '/images/2.jpg', description: 'Crispy chinese noodles with meat and veg!', type: 'main', prep_time: 25}),
         knex('menu_items').insert({name: 'Pho', price: 7.00, image: '/images/3.jpg', description: 'Pho king good!', type: 'main', prep_time: 20}),
         knex('menu_items').insert({name: 'Ramen', price: 10.00, image: '/images/4.jpg', description: 'Rikimaru Ramen, the best ramen from Hanamura', type: 'main', prep_time: 10}),
         knex('menu_items').insert({name: 'Ramune', price: 4.00, image: '/images/5.jpg', description: 'I have never drank this before so i have no idea what to say about it', type: 'drink', prep_time: 5}),
         knex('menu_items').insert({name: 'California Roll', price: 3.00, image: '/images/6.jpg', description: 'Not actual sushi', type: 'side', prep_time: 10}),
         knex('menu_items').insert({name: 'Milk bubble tea', price: 3.50, image: '/images/7.jpg', description: 'Give me boba or give me death', type: 'drink', prep_time: 5}),
         knex('menu_items').insert({name: 'Dim Sum', price: 2.50, image: '/images/8.jpg', description: 'You get one random dim sum dish (NO CHOOSING)', type: 'side', prep_time: 10}),
      ]);
    });
};