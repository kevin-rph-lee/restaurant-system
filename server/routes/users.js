"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //Checking if logging in. If logged in, sends the email of the user back. If not, sends "Guest"
  router.get('/', (req, res) => {
    if(!req.session.email){
      console.log("user is guest");
      res.json('Guest');
    } else{
      console.log("user is ", req.session.email)
      res.json(req.session.email);
    }
  });


  router.post('/login', (req, res) => {
    knex
      .select('email', 'password')
      .from('users')
      .where({email:req.body.email})
      .then((results) => {

        if(results.length===0){
          res.status(400).send('Invalid email format!')
        }else if(results[0].password !== req.body.password){
          res.status(400).send('Invalid email format!')
        } else {
          req.session.email = req.body.email;
          res.json(req.session.email);
        }
      });
  });

  router.post('/register', (req, res) => {
    console.log(req.body);
    knex
      .insert({email: req.body.email, password: req.body.password, phone_number: req.body.phoneNumber, owner: false})
      .into('users')
      .returning('id')
      .then((results) => {
        req.session.email = req.body.email;
        res.json(req.body.email);
      });
  });

  //Log user out
  router.post('/logout', (req, res) => {
    req.session.email = null;
    console.log('logging off user');
    console.log('req.session.email')
    res.sendStatus(200);
  });

  return router;
};
