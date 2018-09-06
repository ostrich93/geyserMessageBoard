const Sequelize = require('sequelize');

const db = require('../database');
const User = require('./user');

const Post = db.define('post', {
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    defaultScope: {
        include: [
            {model: User}
        ]
    }
});

module.exports = Post;
