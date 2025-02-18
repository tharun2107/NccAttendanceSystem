

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  regimentalNumber: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    enum: ['B1', 'B2', 'C'],
    required: true,
  },
  division: {
    type: String,
    enum: ['SD', 'SW'],
    required: true,
  },
  attendanceRecords: [
    {
      status: {
        type: String,
        enum: ['present', 'absent'],
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
  attendancePercentage: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
