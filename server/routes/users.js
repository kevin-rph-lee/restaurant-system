"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


  router.get('/', (req, res) => {
    if(!req.session.email){
      res.json('Not Logged In');
    } else{
      res.json(req.session.email);
    }
  });


  router.post('/login', (req, res) => {
    knex
      .select("email", "password")
      .from("users")
      .where({email:req.body.email})
      .then((results) => {

        console.log(results[0]);
      });
    req.session.email = req.body.email;
    res.json(req.session.email);
  });


  router.post('/logout', (req, res) => {
    req.session = null;
    res.sendStatus(200);
  });

  return router;
};
