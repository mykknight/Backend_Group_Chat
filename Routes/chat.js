const express = require('express');
const Router = express.Router();
const Auth = require('../middleware/auth');

const chatcont = require('../Controller/chatcont');

Router.post('/send-chat',Auth.authentication, chatcont.send_msg);

module.exports = Router;