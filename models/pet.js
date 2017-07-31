const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;

const PetSchema = new mongoose.Schema({
  title: {
      type: String,
      trim: true,
      required: '請輸入標題'
  },
  image: String,
  created: {
    type: Date,
    default: Date.now
  },
  description: {
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
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }] 
});

//Define index
PetSchema.index({
  name: 'text',
  description: 'text'
})

module.exports = mongoose.model('Pet', PetSchema);