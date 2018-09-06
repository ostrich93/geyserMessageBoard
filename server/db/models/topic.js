const Sequelize = require('sequelize');

const db = require('../database');
const User = require('./user');

const Topic = db.define('topic', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    }
}, {
    defaultScope: {
        include: [
            { model: User }
        ]
    }
});

module.exports = Topic;
