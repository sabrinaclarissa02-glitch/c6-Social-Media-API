module.exports = (db) =>
  db.model(
    'DmMessage',
    new db.Schema(
      {
        conversationId: {
          type: db.Schema.Types.ObjectId,
          ref: 'DmConversation',
          required: true,
        },
        senderId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          required: true,
        },
        receiverId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          required: true,
        },
        text: {
          type: String,
          required: true,
          trim: true,
        },
        isRead: {
          type: Boolean,
          default: false,
        },
        readAt: {
          type: Date,
          default: null,
        },
      },
      { timestamps: true }
    )
  );