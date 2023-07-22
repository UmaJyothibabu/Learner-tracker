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




//get student
router.get("/students", async (req, res) => {
  try {
    let studentlist = await Student.find();
    res.json(studentlist);
  } catch (error) {
    res.json({ message: "Unable to load", err: error.message });
  }
});




// Delete students

router.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.json({ message: "unable to delete", err: error.message });
  }
});


module.exports = router;
