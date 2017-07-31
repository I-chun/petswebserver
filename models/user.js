const mongoose   = require('mongoose');
const validator  = require('validator');
mongoose.Promise = global.Promise;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: '請輸入姓名'
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: '請輸入Email',
    validate: [validator.isEmail,'Invalid Email Address']
  }
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);