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
          getMenuItemPrice()
          .then((menuInfoArray)=> {

            const menuInfoObj = {};
            for(let i = 0; i < menuInfoArray.length; i++){
              menuInfoObj[menuInfoArray[i].id] =  {price:menuInfoArray[i].price};
            }
            console.log('Menu Info Obj: ', menuInfoObj);


            const orderQuantities = req.body.orderQuantities;
            const userID = results[0].id;
            let orderTotalPrice = 0;


            console.log('Userid: ',userID);
            knex
              .insert({user_id:userID, finish_time: moment()})
              .into('orders')
              .returning('id')
              .then((results) => {
                const orderID = results[0];
                const arr = [];
                Object.keys(orderQuantities).forEach(function(key) {
                      console.log('Item: ', key, orderQuantities[key]);

                      const orderedItemPrice = menuInfoObj[key].price * orderQuantities[key];
                      orderTotalPrice += orderedItemPrice;

                      arr.push(knex
                        .insert({order_id:orderID, menu_item_id:key, quantity:orderQuantities[key], total_item_price: orderedItemPrice})
                        .into('ordered_items')
                      )
                })
                Promise.all(arr).then(() => {
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
