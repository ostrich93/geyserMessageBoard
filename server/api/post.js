const router = require('express').Router();
const { Post, User, Topic } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (err) {
        next(err);
    }
});

router.get('/:postid', async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.postid);
        res.json(post);
    } catch (err) {
        next(err);
    }
});

// router.post('/', async(req, res, next) => {
//     try {
//         const author = await User.findById(req.body.user.user_id);
//         const newPost = await User.build(req.body);
//         newPost.setUser(author, {save: false});
//         await newPost.save();
//         const returnedPost = newPost.toJSON();
//         returnedPost.user
//     }
// })