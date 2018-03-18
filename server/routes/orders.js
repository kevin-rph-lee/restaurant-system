"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, moment) => {

  /**
   * Gets menu item price from DB
   * @return {Promise} array of menu item info
   */
  function getMenuItemInfo(){
    return knex.select('id', 'price', 'prep_time')
      .from('menu_items')
  }



  //Returns a number which is the time difference between now and when the order should be ready
  router.get('/time/:id', (req, res) => {

    knex.select('finish_time')
      .from('orders')
      .where({id:req.params.id})
      .then((results) => {
        const now = moment();
        if(moment(results[0].finish_time).diff(now, 'minutes') >= 0){
          return res.json(moment(results[0].finish_time).diff(now, 'minutes'));
        } else {
          return res.json(0);
        }

      });
  });


  //Get information for all orders in the system
  router.get('/time', (req, res) => {

    knex.select('id','finish_time')
      .from('orders')
      .then((results) => {
        const now = moment();
        const timeDiffArray = [];
        for(let i = 0; i < results.length; i++){
          if(moment(results[i].finish_time).diff(now, 'minutes') >= 0){
            timeDiffArray.push({id:results[i].id,timeDiff:moment(results[i].finish_time).diff(now, 'minutes')});
          } else {
            timeDiffArray.push({id:results[i].id,timeDiff:0});
          }
          // console.log('moment: ', moment(results[i].finish_time).diff(now, 'minutes'));
        }
        res.json(timeDiffArray);
      });
  });


  //Get information for all orders in the system
  router.get('/', (req, res) => {

    knex.select('orders.id', 'users.email', 'menu_items.name', 'ordered_items.quantity', 'ordered_items.total_item_price', 'orders.finish_time', 'ordered_items.total_item_price', 'orders.total_order_price', 'orders.finished')
      .from('orders')
      .innerJoin('users', 'users.id', 'orders.user_id')
      .innerJoin('ordered_items', 'orders.id', 'ordered_items.order_id')
      .innerJoin('menu_items', 'menu_item_id', 'menu_items.id')
      .then((results) => {
        let orders = {};

        // Making keys in order object along with inserting order info
        for(let i = 0 ; i < results.length; i ++){
          orders[results[i].id] = {
            finishTime:moment(results[i].finish_time).format('h:mm:ss a, MMMM Do YYYY'),
            totalOrderPrice:results[i].total_order_price,
            orderedItems:[],
            email:results[i].email,
            finished: results[i].finished
          };
        }
        //Inserting info for each individual ordered item
        for(let y = 0 ; y < results.length; y ++){
          orders[results[y].id].orderedItems.push({
            name:results[y].name,
            quantity: results[y].quantity,
            totalItemPrice: results[y].total_item_price
          });
        }
        let ordersArray = [];
        for(let x in orders){
          orders[x].id = x;
          ordersArray.push(orders[x]);
        }

        return res.json(ordersArray);
      });

  });



  //Get information for all orders in the system
  router.post('/:id/finish', (req, res) => {

    if(!req.session.email){
      return res.sendStatus(403);
    }

    knex
      .select('owner')
      .from('users')
      .where({email: req.session.email})
      .then((results) => {
        if(results.length === 0 || results.owner === false ){
          return res.sendStatus(400);
        } else {
          //Turning finished status to true and updating the finish time
          knex('orders')
            .where({ id:req.params.id })
            .update({ finished:true, finish_time:moment()})
            .then(()=>{
              res.sendStatus(200);
            });
        }
      })
  });


  //Creating a new order
  router.post('/new', (req, res) => {
    //Checking if user is online
    if(!req.session.email){
      return res.sendStatus(401);
    }

    //Checking if user exists
    knex
      .select('id')
      .from('users')
      .where({email: req.session.email})
      .then((results) => {
        if(results.length !== 0){
          //Grabbing the menu info
          getMenuItemInfo()
          .then((menuInfoArray)=> {

            //Creating an array to hold prep times of each item being ordered
            const prepTimes = [];

            //Converting the array result into an easier to read obj
            const menuInfoObj = {};
            for(let i = 0; i < menuInfoArray.length; i++){
              menuInfoObj[menuInfoArray[i].id] =  {price:menuInfoArray[i].price, prepTime:menuInfoArray[i].prep_time};
            }

            const orderQuantities = req.body.orderQuantities;
            const userID = results[0].id;
            let orderTotalPrice = 0;

            //Inserting the new order
            knex
              .insert({user_id:userID, finished:false})
              .into('orders')
              .returning('id')
              .then((results) => {
                //Inserts each individual ordered item
                const orderID = results[0];
                const arr = [];
                Object.keys(orderQuantities).forEach(function(key) {
                      const orderedItemPrice = menuInfoObj[key].price * orderQuantities[key];
                      orderTotalPrice += orderedItemPrice;
                      console.log('Testing: ', orderID + ' ' + key + ' ' + orderQuantities[key] + orderedItemPrice)
                      arr.push(
                        knex
                        .insert({order_id:orderID, menu_item_id:key, quantity:orderQuantities[key], total_item_price: orderedItemPrice})
                        .into('ordered_items')
                      )
                      prepTimes.push(menuInfoObj[key].prepTime);

                })
                Promise.all(arr).then(() => {
                  //Updating new total order price in order table

                  //Finding the maximum prep time allowed based off item ordered with the longest prep time
                  const maxPrepTime = Math.max.apply(Math, prepTimes)


                  knex('orders')
                    .where({ id:orderID })
                    .update({ total_order_price:orderTotalPrice, finish_time: moment().add(maxPrepTime, 'minutes') })
                    .then(()=>{
                      //Getting the recently inserted order back from the DB to send to the frontend
                      knex.select('orders.id', 'users.email', 'menu_items.name', 'ordered_items.quantity', 'ordered_items.total_item_price', 'orders.finish_time', 'ordered_items.total_item_price', 'orders.total_order_price')
                        .from('orders')
                        .innerJoin('users', 'users.id', 'orders.user_id')
                        .innerJoin('ordered_items', 'orders.id', 'ordered_items.order_id')
                        .innerJoin('menu_items', 'menu_item_id', 'menu_items.id')
                        .where({'orders.id':orderID})
                        .then((results) => {

                          const orderInfo = {
                            id:results[0].id,
                            finishTime: moment(results[0].finish_time).format('h:mm:ss a, MMMM Do YYYY'),
                            totalOrderPrice: results[0].total_order_price,
                            email: results[0].email,
                            orderedItems: []
                          }

                          for(let y = 0 ; y < results.length; y ++){

                            orderInfo.orderedItems.push({
                              name:results[y].name,
                              quantity: results[y].quantity,
                              totalItemPrice: results[y].total_item_price
                            });
                          }

                          return res.json(orderInfo);
                        });
                    });
                });
              });
          })

        } else {
          return res.sendStatus(401);
        }
      });
  });




  return router;
};
