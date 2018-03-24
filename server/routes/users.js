"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //Checking if logging in. If logged in, sends the email of the user back. If not, sends "Guest"
  router.get('/', (req, res) => {
    if(!req.session.email){
      console.log("user is guest");
      res.json({email:'Guest', owner:false});
    } else{
      knex
        .select('owner')
        .from('users')
        .where({email:req.session.email})
        .then((results) => {
          console.log('results: ', results[0])
          if(results.length === 0){
            res.json({email:'Guest', owner:false});
          } else if (results[0].owner === true) {
            res.json({email:req.session.email, owner:true});
          } else {
            res.json({email:req.session.email, owner:false});
          }
        })
    }
  });


  router.post('/login', (req, res) => {
    knex
      .select('id', 'email', 'password', 'owner')
      .from('users')
      .where({email:req.body.email})
      .then((results) => {
        console.log('Input from frontend: ', req.body.email)
        console.log('User: ', results[0])
        if(results.length===0){
          console.log('no length')
          res.status(400).send('Invalid email format!')
        }else if(results[0].password !== req.body.password){
          console.log('wrong password')
          res.status(400).send('Invalid email format!')
        } else {
          if(results[0].owner === true){
            req.session.email = req.body.email;
            res.json({email:req.session.email, owner:true});
          } else {
            req.session.email = req.body.email;
            res.json({email:req.session.email, owner:false});

          }
        }
      });
  });

  router.post('/register', (req, res) => {
    knex
      .select('*')
      .from('users')
      .where({email:req.body.email})
      .then((results) => {
        if(results.length === 0){
          knex
            .insert({email: req.body.email, password: req.body.password, owner: false})
            .into('users')
            .returning('id')
            .then((results) => {
              req.session.email = req.body.email;
              res.json({email:req.session.email, owner:false});
            });
        } else {
          res.sendStatus(400);
        }
      })
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
