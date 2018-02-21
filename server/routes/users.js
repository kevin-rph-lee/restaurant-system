"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //Checking if logging in. If logged in, sends the email of the user back. If not, sends "Guest"
  router.get('/', (req, res) => {
    if(!req.session.email){
      res.json('Guest');
    } else{
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

  //Log user out
  router.post('/logout', (req, res) => {
    req.session = null;
    res.sendStatus(200);
  });

  return router;
};
