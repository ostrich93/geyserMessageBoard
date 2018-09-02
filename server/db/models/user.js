const Sequelize = require('sequelize');
const crypto = require('crypto');

const db = require('../database');

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        notEmpty: true,
        isEmail: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        isUnique: true
    },
    googleId: Sequelize.STRING,
    avatar: { 
        type: Sequelize.STRING
        //defaultValue: /images/default-photo.jpg'
    },
    memberType: {
        type: Sequelize.ENUM,
        values: ['member', 'banned', 'mod', 'admin'],
        defaultValue: 'member'
    }
}, {
    getterMehods: {
        isAdmin() {
            return this.memberType === 'admin';
        },
        isMod() {
            return (this.memberType === 'mod' || this.memberType === 'admin');
        },
        isMember() {
            return this.memberType !== 'banned';
        },
        isBanned() {
            return this.memberType === 'banned';
        }
    }
    //add hooks for getting their posted topics, posts, and friends list
    //also need to add a validator/method of some kind to generate password and salt.
});

module.exports = User;
