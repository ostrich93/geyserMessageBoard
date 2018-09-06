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
Topic.belongsTo(Forum, {as: 'topic', foreignKey: 'forum_id'});

User.hasMany(Topic, {foreignKey: 'creator_id'});
Topic.belongsTo(User, { as: 'topic', foreignKey: 'user_id' });
User.belongsTo(Topic, { as: 'openingPoster', foreignKey: 'topic_id' });

Topic.hasMany(Tag, {foreignKey: 'topic_id'});
Tag.belongsToMany(Topic, {through: 'associated_topics'});

Topic.hasMany(Post, {
    foreignKey: 'topic_id',
    onDelete: 'cascade',
    hooks: true
});
Post.belongsTo(Topic, { as: 'post', foreignKey: 'topic_id' });

User.hasMany(Post, {foreignKey: 'poster_id'});
Post.belongsTo(User, { as: 'post', foreignKey: 'poster_id' });

Forum.hasMany(Forum, {
    foreignKey: 'parent_board'
});
Forum.belongsTo(Forum, {as: 'subboard', foreignKey: 'parent_board'});

module.exports = {
    db,
    Forum,
    Post,
    Tag,
    Topic,
    User
};
