const mongoose = require('mongoose');

const exploreSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, default: 0 },
    tags: [{ type: String, trim: true }],
    isTrending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Explore || mongoose.model('Explore', exploreSchema);
