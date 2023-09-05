import mongoose from "mongoose";
import bcrypt from 'bcrypt';

// defined User schema
const UserSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  username: { 
    type: String,
    required: true,
    maxLength: 30,
    minLength: 4,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024,
  },
}, { timestamps: true }, { toJSON: {virtuals: true }}, { toObject: {virtuals: true }});

// bcrypt salt rounds
const saltRounds = process.env.salt || 8;

UserSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});


// method to compare password with hashed password
UserSchema.methods.comparePasswords = async function(candidatePassword, hashedPassword) {
  return bcrypt.compare(candidatePassword, hashedPassword);
}

// create user model
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;