module.exports = (db) => {
  const schema = new db.Schema(
    {
      userId: {
        type: db.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
      },
      postId: {
        type: db.Schema.Types.ObjectId,
        ref: 'Posts',
        required: true
      }
    },
    {
      timestamps: true
    }
  );

  schema.index({ userId: 1, postId: 1 }, { unique: true });

  schema.index({ postId: 1 });

  return db.model('Repost', schema);
};