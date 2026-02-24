const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    required: true
  },
  crn: {
    type: String,
    required: true,
    unique: true
  },
  course: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true,
    enum: ['1st', '2nd', '3rd', '4th']
  },
  section: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C', 'D']
  }
}, { timestamps: true });

module.exports = mongoose.model('Classroom', classroomSchema);
