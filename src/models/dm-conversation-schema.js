const mongoose = require('mongoose');

const dmConversationSchema = new mongoose.Schema(
  {
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    lastMessage: { type: String, default: '', trim: true },
    lastMessageAt: { type: Date, default: Date.now },
    archivedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

module.exports = mongoose.models.DmConversation || mongoose.model('DmConversation', dmConversationSchema);
