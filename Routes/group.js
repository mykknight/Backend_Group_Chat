const express = require('express');
const Router = express.Router();
const Auth = require('../middleware/auth');

const groupcont = require('../Controller/groupcont');

Router.get('/group-members/:grpid', Auth.authentication, groupcont.getGroupdetails);

Router.get('/makeadmin/:userid', Auth.authentication, groupcont.makeadmin);

Router.get('/removeuser/:userid', Auth.authentication, groupcont.removeuser);

Router.post('/adduser', Auth.authentication, groupcont.adduser);

module.exports = Router;