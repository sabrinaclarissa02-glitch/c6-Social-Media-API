module.exports = (db) =>
  db.model(
    'Comments',
    new db.Schema(
      {
        postId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Posts',
          required: true,
        },
        userId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          required: true,
        },
        content: {
          type: String,
          required: true,
          maxLength: 500,
        },
      },
      { timestamps: true }
    )
  );