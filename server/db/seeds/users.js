const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {

  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({email: 'owner@gmail.com', password: bcrypt.hashSync('test', 10), owner:true}),
        knex('users').insert({email: 'user@gmail.com', password: bcrypt.hashSync('test', 10), owner:false}),
        knex('users').insert({email: 'user2@gmail.com', password: bcrypt.hashSync('test', 10), owner:false})
      ]);
    });
};