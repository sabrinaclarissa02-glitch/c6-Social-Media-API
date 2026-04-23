module.exports = (db) =>
  db.model(
    'Settings',
    new db.Schema(
      {
        userId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          required: true,
          unique: true,
        },
        isPrivateAccount: {
          type: Boolean,
          default: false,
        },
        allowDmFrom: {
          type: String,
          enum: ['everyone', 'followers', 'none'],
          default: 'everyone',
        },
        showOnlineStatus: {
          type: Boolean,
          default: true,
        },
        notificationMessage: {
          type: Boolean,
          default: true,
        },
        notificationFollow: {
          type: Boolean,
          default: true,
        },
        notificationLike: {
          type: Boolean,
          default: true,
        },
        theme: {
          type: String,
          enum: ['light', 'dark'],
          default: 'light',
        },
        language: {
          type: String,
          default: 'id',
        },
        blockedUsers: [
          {
            type: db.Schema.Types.ObjectId,
            ref: 'Users',
          },
        ],
      },
      { timestamps: true }
    )
  );