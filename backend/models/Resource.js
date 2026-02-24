const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  available: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'occupied'],
    default: 'available'
  },
  building: {
    type: String,
    required: true
  },
  floor: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
