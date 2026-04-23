module.exports = (db) =>
  db.model(
    'Like',
    new db.Schema(
      {
        userId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          required: true
        },
        postId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Posts',
          required: true
        }
      },
      {
        timestamps: true
      }
    ).index({ userId: 1, postId: 1 }, { unique: true })
  );