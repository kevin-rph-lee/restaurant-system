"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, moment) => {

  /**
   * Gets menu item price from DB
   * @return {Promise} array of menu item info
   */
  function getMenuItemPrice(){
    return knex.select('id', 'price')
      .from('menu_items')
  }

  router.get('/', (req, res) => {

    knex.select('orders.id', 'menu_items.name', 'ordered_items.quantity', 'ordered_items.total_item_price', 'orders.finish_time', 'ordered_items.total_item_price', 'orders.total_order_price')
      .from('orders')
      .innerJoin('ordered_items', 'orders.id', 'ordered_items.order_id')
      .innerJoin('menu_items', 'menu_item_id', 'menu_items.id')
      .then((results) => {
        let orders = {};
        // Making keys in order object along with inserting order info
        for(let i = 0 ; i < results.length; i ++){
          orders[results[i].id] = {
            finish_time:results[i].finish_time,
            total_order_price:results[i].total_order_price,
            ordered_items:{}
          };
        }
        //Inserting info for each individual ordered item
        for(let y = 0 ; y < results.length; y ++){
          console.log('Results ',results[y]);
          console.log('Orders ', orders[results[y].id].ordered_items);
          orders[results[y].id].ordered_items[results[y].name] = {
            quantity:results[y].quantity,
            total_item_price:results[y].total_item_price
          }
        }
        let ordersArray = [];
        for(let x in orders){
          orders[x].id = x;
          ordersArray.push(orders[x]);
        }



        return res.json(ordersArray);
      });

  });


  //Creating a new order
  router.post('/new', (req, res) => {
    //Checking if user is online
    if(!req.session.email){
      return sendStatus(401);
    }

    //Checking if user exists
    knex
      .select('id')
      .from('users')
      .where({email: req.session.email})
      .then((results) => {
        if(results.length !== 0){
          //Grabbing the menu info
          getMenuItemPrice()
          .then((menuInfoArray)=> {

            //Converting the array result into an easier to read obj
            const menuInfoObj = {};
            for(let i = 0; i < menuInfoArray.length; i++){
              menuInfoObj[menuInfoArray[i].id] =  {price:menuInfoArray[i].price};
            }

            const orderQuantities = req.body.orderQuantities;
            const userID = results[0].id;
            let orderTotalPrice = 0;
            //Inserting the new order
            knex
              .insert({user_id:userID, finish_time: moment()})
              .into('orders')
              .returning('id')
              .then((results) => {
                //Inserts each individual ordered item
                const orderID = results[0];
                const arr = [];
                Object.keys(orderQuantities).forEach(function(key) {
                      const orderedItemPrice = menuInfoObj[key].price * orderQuantities[key];
                      orderTotalPrice += orderedItemPrice;

                      arr.push(knex
                        .insert({order_id:orderID, menu_item_id:key, quantity:orderQuantities[key], total_item_price: orderedItemPrice})
                        .into('ordered_items')
                      )
                })
                Promise.all(arr).then(() => {
                  //Updating new total order price in order table
                  knex('orders')
                    .where({ id:orderID })
                    .update({ total_order_price:orderTotalPrice })
                    .then(()=>{
                      res.sendStatus(200);
                    });
                });
              });
          })

        } else {
          return sendStatus(401);
        }
      });
  });

  return router;
};
