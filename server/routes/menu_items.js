"use strict";

const express = require('express');
const router  = express.Router();
const multer = require('multer');


module.exports = (knex, path) => {




  const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, './frontend/public/images')
    },
    filename: function(req, file, callback) {
      callback(null, 'test' + path.extname(file.originalname))
    }
  })
  let upload  = multer({ storage: storage});




  router.post('/add', (req, res) => {
    knex
      .select("owner")
      .from("users")
      .where({email:req.session.email})
      .then((results) => {
        if(results.length===0 || results[0].owner === false){
          res.sendStatus(400);
          return;
        } else {
          knex
            .insert({name:req.body.name, price:req.body.price, description:req.body.description, type:req.body.type, sold_out:false, prep_time: req.body.prepTime})
            .into('menu_items')
            .returning('id')
            .then((results) => {

              res.json({id:results[0]});
              return;
            });
        }
      });

  });


  router.post('/add/image/:id', function(req, res) {
    if(!req.session.email){
      res.sendStatus(400);
      return;
    }
    knex
      .select("owner")
      .from("users")
      .where({email:req.session.email})
      .then((results) => {
        if(results.length===0 || results[0].owner === false){
          res.sendStatus(400);
          return;
        } else {
          console.log('Body: ',req.body.body)
          const storage = multer.diskStorage({
            destination: function(req, file, callback) {
              callback(null, './frontend/public/images')
            },
            filename: function(req, file, callback) {
              callback(null, req.params.id + path.extname(file.originalname))
            }
          })

          const upload = multer({
            storage: storage,
            fileFilter: function(req, file, callback) {
              //Only allowing png, jpg, gif, jpeg
              const ext = path.extname(file.originalname)
              if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                res.sendStatus(400);
                return;
              }
              callback(null, true)
            }
          }).single('file');
          upload(req, res, function(err) {
            knex('menu_items')
            .where({ id:req.params.id })
            .update({ 'image': '/images/' + req.params.id + '.jpg' })
            .then(()=>{
              res.sendStatus(200);
            });
          })

        }
      });
  })

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

    if( !(isNaN(req.body.price)) ){
      console.log('NAAAN')
      promiseArray.push(
        knex('menu_items')
          .where({ id:req.params.id })
          .update({ price:req.body.price })
      )
    }

    promiseArray.push(
      knex('menu_items')
        .where({ id:req.params.id })
        .update({ sold_out:req.body.soldOut })
    )

    Promise.all(promiseArray).then(() => {
      res.sendStatus(200);
    })
  });

  return router;
};
