const Sequelize = require('sequelize');

const db = require('../database');

const Topic = db.define('topic', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    }
});

module.exports = Topic;
