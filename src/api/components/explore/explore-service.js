const exploreRepository = require('./explore-repository');

const getExplorePosts = async () => exploreRepository.findExplorePosts();

module.exports = { getExplorePosts };
