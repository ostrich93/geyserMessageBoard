const db = require('../database');
const Forum = require('./forum');
const Post = require('./post');
const Tag = require('./tag');
const Topic = require('./topic');
const User = require('./user');

Forum.hasMany(Topic, {
    foreignKey: 'forum_id',
    onDelete: 'cascade',
    hooks: true
});
Topic.belongsTo(Forum, {as: 'topic'});

User.hasMany(Topic, {foreignKey: 'creator_id'});
Topic.belongsTo(User, {as: 'topic'});
User.belongsTo(Topic, {as: 'openingPoster'});

Topic.hasMany(Tag, {foreignKey: 'topic_id'});
Tag.belongsToMany(Topic, {through: 'associated_topics'});

Topic.hasMany(Post, {
    foreignKey: 'parentTopic_id',
    onDelete: 'cascade',
    hooks: true
});
Post.belongsTo(Topic, {as: 'post'});

User.hasMany(Post, {foreignKey: 'poster_id'});
Post.belongsTo(User, {as: 'post'});

Forum.hasMany(Forum, {
    foreignKey: 'parent_board'
});
Forum.belongsTo(Forum, {as: 'subboard'});

module.exports = {
    db,
    Forum,
    Post,
    Tag,
    Topic,
    User
};
