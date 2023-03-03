const express = require('express');
const Router = express.Router();
const Auth = require('../middleware/auth');

const chatcont = require('../Controller/chatcont');

Router.post('/send-chat/:grpid',Auth.authentication, chatcont.send_msg);


Router.get('/groups/:grpid', Auth.authentication, chatcont.getGroupchat);

module.exports = Router;