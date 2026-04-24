const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, trim: true, maxlength: 300, default: '' },
    mediaUrl: { type: String, default: '' },
    viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    expiresAt: { type: Date, default: () => Date.now() + 24 * 60 * 60 * 1000 },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Status || mongoose.model('Status', statusSchema);
