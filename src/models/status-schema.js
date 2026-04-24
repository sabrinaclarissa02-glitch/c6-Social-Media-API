module.exports = (db) =>
  db.model(
    'Status',
    new db.Schema(
      {
        userId: {
          type: db.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        content: {
          type: String,
          trim: true,
          maxLength: 300,
        },
        mediaUrl: {
          type: String,
          default: '',
        },
        viewers: [
          {
            type: db.Schema.Types.ObjectId,
            ref: 'User',
          },
        ],
        expiresAt: {
          type: Date,
          default: () => Date.now() + 24 * 60 * 60 * 1000, // 24 jam
        },
      },
      { timestamps: true }
    )
  );