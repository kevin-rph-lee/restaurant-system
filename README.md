# The Noodle Box

A menu ordering and management system built for the fictional noodle restaurant *The Noodle Box.* This system is used by customers within the restaurant to make their orders and allows for kitchen staff to track these orders and inform customers of their order status real-time. Businesss owners also have the ability to manage menu items (editing, adding, etc.) and are also provided with with revenue/purchase reports.

The backend server is built with Node/Express, ReactJS for the frontend, websockets to allow real-time updates, and PostgreSQL for the database.

<p align="center">
<img src="https://i.imgur.com/tsqd9mO.jpg" width="75%" height="75%" align="middle" />
</p>


## Getting Started

Create env file based off of .env.example for postgresql DB configuration.

Install dependencies within the server, frontend, and websocket server.

```
npm install
cd frontend
npm install
cd ../wsserver
npm install
```

Setup/seed the DB

```
npm run knex migrate:latest
npm run knex migrate:rollback
```

Finally, start the websocket server within the wss folder with npm start, and in a *seperate* terminal window run npm start within the application root folder.


## Features

### Customer Ordering Management

As a customer, you can make your order directly from the system and the order will be automatically pushed to the kitchen staff.

<img src="https://i.imgur.com/VXbRu6t.gif" width="40%" height="40%" align="middle" />


After submitting your order, your order information is presented to you including cost, order status, and estimated order finish time.

<img src="https://imgur.com/DREwCWm.jpg" width="40%" height="40%" align="middle" />

### Kitchen Tracking

Kitchen staff will have new orders directly pushed to their screen real-time using the websocket server. They can track orders from here and mark orders as complete.

When an order is marked complete by the kitchen staff, the customer is notified via their order information screen.

### Showing estimated time until order if finished

Both customers and kitchen staff see how long left until their order is ready (or expected to be ready). As the time gets closer to the expected finish time, it changes colour to yellow, and finally red if the order is late (it is expected by the kitchen staff that no orders go red). Once an order is marked finished by kitchen staff, the colour coding turns green.

<img src="https://i.imgur.com/zs07F2e.jpg" width="40%" height="40%" align="middle" />

<img src="https://i.imgur.com/5R1TOQf.jpg" width="40%" height="40%" align="middle" />

<img src="https://i.imgur.com/u7yy6vQ.jpg" width="40%" height="40%" align="middle" />



### Menu Managment

The system has the ability to edit/add menu items if logged in as the owner. The restaurant owner has the ability to mark items "sold out" which is updated real-time on the restaurant menu for customers.

<img src="https://i.imgur.com/0tgCGKD.jpg" width="40%" height="40%" align="middle" />

### Business Intelligence

Revenue and sales tracking broken down by menu item type (Mains, Sides, Drink)

<img src="https://imgur.com/hvvh6aZ.jpg" width="40%" height="40%" align="middle" />

## Contributors

* <a href="https://github.com/kevin-rph-lee">Kevin Lee</a>