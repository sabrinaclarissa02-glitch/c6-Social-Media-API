const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    isPrivateAccount: { type: Boolean, default: false },
    allowDmFrom: { type: String, enum: ['everyone', 'followers', 'none'], default: 'everyone' },
    showOnlineStatus: { type: Boolean, default: true },
    notificationMessage: { type: Boolean, default: true },
    notificationFollow: { type: Boolean, default: true },
    notificationLike: { type: Boolean, default: true },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    language: { type: String, default: 'id' },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

module.exports = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
