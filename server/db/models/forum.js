const Sequelize = require('sequelize');

const db = require('../database');

const Forum = db.define('forum', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//The associated subforms and the like are based on associations. Might want to add validators and the like

module.exports = Forum;
