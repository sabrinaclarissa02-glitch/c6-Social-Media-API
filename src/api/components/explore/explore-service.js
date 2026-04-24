const exploreRepository = require('./explore-repository');

const getExplorePosts = async (userId) => {
  // Bisa dikembangkan: exclude following, sorting by likes, dll
  const posts = await exploreRepository.findExplorePosts(userId);

  return posts;
};

module.exports = {
  getExplorePosts
};
