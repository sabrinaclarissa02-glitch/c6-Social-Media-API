const followService = require('./follow-service');

const followUser = async (req, res) => {
  try {
    const { followingId } = req.params;
    const followerId = req.user.id; 

    await followService.followUser(followerId, followingId);

    res.status(201).json({
      status: 'success',
      message: 'Berhasil mem-follow user',
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { followingId } = req.params;
    const followerId = req.user.id;

    await followService.unfollowUser(followerId, followingId);

    res.status(200).json({
      status: 'success',
      message: 'Berhasil unfollow user',
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

module.exports = { followUser, unfollowUser };