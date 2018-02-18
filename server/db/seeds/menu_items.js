exports.seed = function(knex, Promise) {
  return knex('menu_items').del()
    .then(function () {
      return Promise.all([
         knex('menu_items').insert({name: 'Jajangmyeon', price: 1.00, image: '/images/1.jpg', description: 'Korean black bean noodles', type: 'main'}),
         knex('menu_items').insert({name: 'Chow Mein', price: 2.00, image: '/images/2.jpg', description: 'Crispy chinese noodles with meat and veg!', type: 'main'}),
         knex('menu_items').insert({name: 'Pho', price: 3.00, image: '/images/3.jpg', description: 'Pho king good!', type: 'main'}),
         knex('menu_items').insert({name: 'Ramen', price: 4.00, image: '/images/4.jpg', description: 'Rikimaru Ramen, the best ramen from Hanamura', type: 'main'}),
         knex('menu_items').insert({name: 'Ramune', price: 4.00, image: '/images/5.jpg', description: 'I have never drank this before so i have no idea what to say about it', type: 'drink'}),
         knex('menu_items').insert({name: 'California Roll', price: 4.00, image: '/images/6.jpg', description: 'Not actual sushi', type: 'side'}),
         knex('menu_items').insert({name: 'Milk bubble tea', price: 4.00, image: '/images/7.jpg', description: 'Give me boba or give me death', type: 'drink'}),
         knex('menu_items').insert({name: 'Dim Sum', price: 4.00, image: '/images/8.jpg', description: 'You get one random dim sum dish (NO CHOOSING)', type: 'side'}),
      ]);
    });
};