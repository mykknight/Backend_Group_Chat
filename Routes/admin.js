const express = require('express');
const Router = express.Router();

// var cors = require('cors');
// Router.use(cors());

const admincontroller = require('../Controller/admincont');


Router.post('/signup', admincontroller.signup);
Router.post('/login', admincontroller.login);


module.exports = Router;


