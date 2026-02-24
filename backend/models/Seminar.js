const mongoose = require('mongoose');

const seminarSchema = new mongoose.Schema({
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    required: true
  },
  features: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Seminar', seminarSchema);
