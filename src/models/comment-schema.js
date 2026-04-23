module.exports = (db) =>
  db.model(
    'Comments',
    new db.Schema(
      {
        postId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Post', // Ubah dari 'Posts' menjadi 'Post'
          required: true,
        },
        userId: {
          type: db.Schema.Types.ObjectId,
          ref: 'User', // Ubah dari 'Users' menjadi 'User'
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