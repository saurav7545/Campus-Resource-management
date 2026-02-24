const mongoose = require('mongoose');

const specialLabSchema = new mongoose.Schema({
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    required: true
  },
  researchArea: {
    type: String,
    required: true,
    enum: ['Artificial Intelligence', 'Cyber Security', 'Data Science', 'Robotics', 'Blockchain', 'IoT', 'Cloud Computing']
  },
  equipment: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('SpecialLab', specialLabSchema);
