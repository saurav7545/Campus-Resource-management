const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  equipment: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Lab', labSchema);
