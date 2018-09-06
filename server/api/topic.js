const router = require('express').Router();
const { Topic, Post } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const topics = await Topic.findAll();
        res.json(topics);
    } catch (err) {
        next(err);
    }
});

router.get('/:topicid', async (req, res, next) => {
    try {
        const topic = await Topic.findById(req.params.topicid, {include: [{all: true}]});
        res.json(topic);
    } catch (err) {
        next(err);
    }
});

router.get('/:topicid/posts', async (req, res, next) => {
    try {
        const topicId = req.params.topicid;
        const posts = Post.findAll({ where: { topic_id: topicId }});
        res.json(posts);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newTopic = await Topic.create({title: req.body.title});
        res.status(201).json(newTopic);
    } catch (err) {
        next(err);
    }
});

