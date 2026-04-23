const Repost = require('../models/Repost');

const findRepost = async (userId, postId) => {
    return await Repost.findOne({ userId, postId });
};

const createRepost = async (userId, postId) => {
    return await Repost.create({ userId, postId });
};

const deleteRepost = async (userId, postId) => {
    return await Repost.deleteOne({ userId, postId });
};

const countReposts = async (postId) => {
    return await Repost.countDocuments({ postId });
};  

module.exports = {
    findRepost,
    createRepost,
    deleteRepost,
    countReposts
};