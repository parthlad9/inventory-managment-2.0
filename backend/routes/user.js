const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (this.isModified('password')) {
    // Generate a salt and hash on separate function calls
    const salt = await bcrypt.genSalt(10); // You can increase the salt rounds if you wish
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// The third parameter is the collection name if it's not the plural of the model name
const User = mongoose.model('User', userSchema, 'login');
module.exports = User;
