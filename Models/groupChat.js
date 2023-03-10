const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const groupchat = sequelize.define( 'groupchat' , {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    isAdmin: Sequelize.BOOLEAN
});

module.exports = groupchat;