const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Add a new student
router.post('/students', async (req, res) => {
  try {
    const {
      student_name,
      email_id,
      phone,
      course,
      batch,
      project,
      course_status,
      placement_status,
      training_head,
      placement_officer
    } = req.body;

    const student = new Student({
      student_name,
      email_id,
      phone,
      course,
      batch,
      project,
      course_status,
      placement_status,
      training_head,
      placement_officer
    });

    await student.save();

    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add student' });
  }
});

// Update student details
router.put('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const {
      student_name,
      email_id,
      phone,
      course,
      batch,
      project,
      course_status,
      placement_status,
      training_head,
      placement_officer
    } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        student_name,
        email_id,
        phone,
        course,
        batch,
        project,
        course_status,
        placement_status,
        training_head,
        placement_officer
      },
      { new: true }
    );

    if (!updatedStudent) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.status(200).json({ message: 'Student updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student' });
  }
});

module.exports = router;
