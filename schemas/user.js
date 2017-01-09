const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type    : String,
    required: true,
    unique: false
  },

  email: {
    type  : String,
    required: true,
    unique: true
  },

  password: {
    type  : String,
    required: true,
    unique: false
  },

  admin: {
    type  : Boolean,
    required: true,
    unique: false
  }

});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

module.exports = userSchema;
