"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get('/', (req, res) => {
    knex
      .select("email", "password")
      .from("users")
      .where({email:req.body.email})
      .then((results) => {

      });
  });


  return router;
};
