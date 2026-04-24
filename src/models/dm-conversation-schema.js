module.exports = (db) =>
  db.model(
    'Comment',
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
        content: {
          type: String,
          required: true,
          maxlength: 500,
        },
      },
      { timestamps: true }
    )
  );