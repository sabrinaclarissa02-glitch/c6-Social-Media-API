module.exports = (db) =>
  db.model(
    'Users',
    new db.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      displayName: {
        type: String,
        required: true,
        maxLength: 50 
      },
      userName: {
        type: String,
        required: true,
        unique: true,
      },
      gender: {
        type: String,
        enum: ['Laki-laki', 'Perempuan', 'Non-biner', 'Lainnya', 'Rahasia'],
        default: 'Rahasia'
      },
      bio: {
        type: String,
        maxLength: 150
      },
    }, { timestamps: true })
  );