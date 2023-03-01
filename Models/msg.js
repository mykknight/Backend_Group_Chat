const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Chat = sequelize.define('chat', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Msg: Sequelize.STRING,
    Name: Sequelize.STRING
});

module.exports = Chat;