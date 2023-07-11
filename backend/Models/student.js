const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  student_name: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  course_status: {
    type: String,
    required: true,
  },
  placement_status: {
    type: String,
    required: true,
  },
  training_head: {
    type: String,
    required: true,
  },
  placement_officer: {
    type: String,
  },
});

const studentData = mongoose.model("student", studentSchema);
module.exports = studentData;
