module.exports = (db) =>
  db.model(
    'Follows',
    new db.Schema(
      {
        followerId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          required: true,
        },
        followingId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          required: true,
        },
      },
      { timestamps: true }
    ).index({ followerId: 1, followingId: 1 }, { unique: true })
  );