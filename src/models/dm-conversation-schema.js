module.exports = (db) =>
  db.model(
    'DmConversation',
    new db.Schema(
      {
        members: [
          {
            type: db.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
          },
        ],
        lastMessage: {
          type: String,
          default: '',
          trim: true,
        },
        lastMessageAt: {
          type: Date,
          default: Date.now,
        },
        archivedBy: [
          {
            type: db.Schema.Types.ObjectId,
            ref: 'Users',
          },
        ],
      },
      { timestamps: true }
    )
  );