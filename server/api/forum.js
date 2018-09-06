const router = require('express').Router();
const { Forum, Topic } = require('../db/models');

module.exports = router;

//forums can only be created by admins

router.get('/', async (req, res, next) => {
    try {
        const forums = await Forum.findAll();
        res.json(forums);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const forum = await Forum.findById(req.params.id, {include: [{all: true}]});
        res.json(forum);
    } catch (err){
        next(err);
    }
});

router.get('/:id/topics', async (req, res, next) => {
    try {
        const topicsList = await Topic.findAll({where: {forum_id: req.params.id}});
        res.json(topicsList);
    } catch (err){
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newForum = await Forum.create({name: req.body.name});
        res.status(201).json(newForum);
    } catch (err) {
        next(err);
    }
});

router.post('/:id/topics', async (req, res, next) => {
    try {
        const newTopic = await Topic.create({title: req.body.title, forum_id: req.params.id});
        res.status(201).json(newTopic);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        await Forum.update(req.body, {name: req.body.name});
        const updatedForum = await Forum.findById(req.params.id);
        res.json(updatedForum);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await Forum.destroy({where: { id } });
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

