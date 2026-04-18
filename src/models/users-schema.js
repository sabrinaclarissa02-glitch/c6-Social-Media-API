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
      customGender: {
        type: String,
        required: function() {
            return this.gender === 'Lainnya';
        },
        maxLength: 50
      },

      profilePicture: {
        type: String,
        default: 'https://pixabay.com/images/download/wanderercreative-blank-profile-picture-973460_1920.png' 
      },

      followersCount: { type: Number, default: 0 },
      followingCount: { type: Number, default: 0 },
      
      followers: [{
        _id: false, 
        userId: { type: db.Schema.Types.ObjectId, ref: 'Users' },
        userName: String,
        profilePicture: String
      }],
      
      following: [{
        _id: false, 
        userId: { type: db.Schema.Types.ObjectId, ref: 'Users' },
        userName: String,
        profilePicture: String
      }],
      isVerified: {
        type: Boolean,
        default: false
      },
      isPrivateAccount: {
        type: Boolean,
        default: false
      }
    }, { timestamps: true })
  );