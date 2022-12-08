const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    owner:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // view:{
    //   type: Number,
    //   default: 0,
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
