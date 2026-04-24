const exploreService = require('./explore-service');

const getExplorePosts = async (req, res, next) => { try {
  const data = await exploreService.getExplorePosts();
  res.status(200).json({ success: true, data });
} catch (error) { next(error); } };

module.exports = { getExplorePosts };
