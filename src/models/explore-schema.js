module.exports = (db) =>
  db.model(
    'Explore',
    new db.Schema(
      {
        postId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Post',
          required: true,
        },
        userId: {
          type: db.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        score: {
          type: Number,
          default: 0, // untuk ranking (likes, views, dll)
        },
        tags: [
          {
            type: String,
            trim: true,
          },
        ],
        isTrending: {
          type: Boolean,
          default: false,
        },
      },
      { timestamps: true }
    )
  );
  