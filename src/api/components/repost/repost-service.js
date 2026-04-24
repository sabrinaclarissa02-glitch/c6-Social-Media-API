const repostRepository = require('./repostRepository');

const repostPost = async (userId, postId) => {
    const existingRepost = await repostRepository.findRepost(userId, postId);
    if (existingRepost) {
        const error = new Error('Anda sudah merepost postingan ini');
        error.statusCode = 400;
        throw error;
    }
    return await repostRepository.createRepost(userId, postId);
};

const unrepostPost = async (userId, postId) => {
    const result = await repostRepository.deleteRepost(userId, postId);
    if (result.deletedCount === 0) {
        const error = new Error('Repost tidak ditemukan');
        error.statusCode = 404;
        throw error;
    }
    return result;
};

const getRepostCount = async (postId) => {
    return await repostRepository.countReposts(postId);
};

module.exports = {
    repostPost,
    unrepostPost,
    getRepostCount
};