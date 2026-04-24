const followService = require('./follow-service');

const followUser = async (req, res, next) => {
  try {
    const { followingId } = req.params;
    const { followerId } = req.body;

    await followService.followUser(followerId, followingId);

    res.status(201).json({
      status: 'success',
      message: 'Berhasil mem-follow user',
    });
  } catch (error) {
    next(error); 
  }
};

const unfollowUser = async (req, res, next) => {
  try {
    const { followingId } = req.params;
    const { followerId } = req.body;

    await followService.unfollowUser(followerId, followingId);

    res.status(200).json({
      status: 'success',
      message: 'Berhasil unfollow user',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { followUser, unfollowUser };