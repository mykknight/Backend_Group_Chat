const express = require('express');
const Router = express.Router();

const Auth = require('../middleware/auth');

// var cors = require('cors');
// Router.use(cors());

const admincontroller = require('../Controller/admincont');


Router.post('/signup', admincontroller.signup);
Router.post('/login', admincontroller.login);

Router.post('/creategroup', Auth.authentication, admincontroller.creategroup);

Router.get('/getgroups/:lastgrpid', Auth.authentication, admincontroller.getGroup);

Router.get('/getusers', admincontroller.getusers);
module.exports = Router;


