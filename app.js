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
const Group = require('./Models/Group');
const GroupChat = require('./Models/groupChat');
const groupchat = require('./Models/groupChat');

User.hasMany(Chat);
Chat.belongsTo(User);

Group.belongsToMany(User, {through: groupchat});
User.belongsToMany(Group, {through: groupchat});

Group.hasMany(Chat);
Chat.belongsTo(Group);

sequelize
//.sync({force: true})
.sync()
.then((res) => app.listen(3000))
.catch(err => console.log(err));