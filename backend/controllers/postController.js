const Post = require('../models/Post');

const getPosts = async (req, res) => {
    const posts = await Post.find().populate('user', 'username');
        res.json(posts);
};

const createPost = async (req, res) => {
    const { title, content } = req.body;
    const post = new Post({
        title,
        content,
        user: req.user._id,
    });

    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: 'Error creating post', error });
    }
};

module.exports = { getPosts, createPost };