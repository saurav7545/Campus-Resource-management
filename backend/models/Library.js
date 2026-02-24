const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    required: true
  },
  hours: {
    type: String,
    required: true
  },
  floors: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Library', librarySchema);
