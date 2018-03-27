import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import favicon from 'serve-favicon';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';


import env from './config/env';

const ENV = process.env.ENV || "development";
const app = express();
const knexConfig = require("./../knexfile.js");
const knex = require("knex")(knexConfig[ENV]);
const cookieSession = require('cookie-session');
const moment = require('moment');
const bcrypt = require('bcrypt');
const multer = require('multer');



var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './server/uploads')
  },
  filename: function(req, file, callback) {
    console.log(file)
    callback(null, 'Test' + path.extname(file.originalname))
  }
})


const upload = multer({ storage });


// console.log(ENV);
/*==================================
=            Middleware            =
==================================*/
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(helmet()); // Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(compression());
app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000
}));



// serve static files, this is for frontend React
app.use('/static', express.static(path.join(__dirname, 'public', 'static')));

/*=====  End of Middleware  ======*/


// Routes
const usersRoutes = require("./routes/users");
const menuItemsRoutes = require("./routes/menu_items");
const ordersRoutes = require("./routes/orders");
app.use("/users", usersRoutes(knex, cookieSession, bcrypt));
app.use("/menu_items", menuItemsRoutes(knex));
app.use("/orders", ordersRoutes(knex, moment));


app.post('/test',upload.single('file'), (req, res) =>{

      res.sendStatus(200);

});



// Load React App
// Serve HTML file for production
if (env.name === 'production') {
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

export default app;
