const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: String 
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);