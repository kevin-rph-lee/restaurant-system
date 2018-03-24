const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {

  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({email: 'test@test.com', password: bcrypt.hashSync('test', 10), owner:true}),
        knex('users').insert({email: 'user@test.com', password: bcrypt.hashSync('test', 10), owner:false})
      ]);
    });
};