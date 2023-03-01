const express = require('express');
const app = express();
const sequelize = require('./util/database');

const bodyparser = require('body-parser');
app.use(bodyparser.json({ extended: false}));

var cors = require('cors');
app.use(
    cors({
        origin: '*'
    })
);

const adminrot = require('./Routes/admin');
const chatrot = require('./Routes/chat');
app.use('/chat',chatrot);
app.use('/user', adminrot);

const User = require('./Models/user');
const Chat = require('./Models/msg');

User.hasMany(Chat);
Chat.belongsTo(User);

sequelize
//.sync({force: true})
.sync()
.then((res) => app.listen(3000))
.catch(err => console.log(err));