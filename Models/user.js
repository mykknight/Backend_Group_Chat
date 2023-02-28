const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    UserName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    PhoneNo: Sequelize.DOUBLE,

    Password: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

module.exports = User;