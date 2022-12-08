const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    author:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
    },
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    like:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', postSchema);
