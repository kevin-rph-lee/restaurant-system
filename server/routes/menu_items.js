"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {



  router.get('/mains', (req, res) => {
    knex
      .select("*")
      .from("menu_items")
      .where({type:'main'})
      .then((results) => {
        res.json(results);
      });
  });

  router.get('/sides', (req, res) => {
    knex
      .select("*")
      .from("menu_items")
      .where({type:'side'})
      .then((results) => {
        res.json(results);
      });
  });

  router.get('/drinks', (req, res) => {
    knex
      .select("*")
      .from("menu_items")
      .where({type:'drink'})
      .then((results) => {
        res.json(results);
      });
  });

  router.get('/', (req, res) => {
    knex
      .select("*")
      .from("menu_items")
      .then((results) => {
        res.json(results);
      });
  });

  return router;
};
