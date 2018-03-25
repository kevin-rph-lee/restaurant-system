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
        //Creating reference string to put into the 'ref' of each menu item element in front end.
        for(let i in results){
          results[i].ref = 'item' + results[i].id;
        }
        res.json(results);
      });
  });

  router.get('/sides', (req, res) => {
    knex
      .select("*")
      .from("menu_items")
      .where({type:'side'})
      .then((results) => {
        //Creating reference string to put into the 'ref' of each menu item element in front end.
        for(let i in results){
          results[i].ref = 'item' + results[i].id;
        }
        res.json(results);
      });
  });

  router.get('/drinks', (req, res) => {
    knex
      .select("*")
      .from("menu_items")
      .where({type:'drink'})
      .then((results) => {
        //Creating reference string to put into the 'ref' of each menu item element in front end.
        for(let i in results){
          results[i].ref = 'item' + results[i].id;
        }
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

  router.post('/:id', (req, res) => {
    console.log(req.params.id)
    console.log(req.body);
    const promiseArray = [];

    if(req.body.name !== ''){
      promiseArray.push(
        knex('menu_items')
          .where({ id:req.params.id })
          .update({ name:req.body.name })
      )
    }

    if(req.body.description !== ''){
      promiseArray.push(
        knex('menu_items')
          .where({ id:req.params.id })
          .update({ description:req.body.description })
      )
    }

    Promise.all(promiseArray).then(() => {
      res.sendStatus(200);
    })
  });

  return router;
};
