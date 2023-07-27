const express = require("express");
const router = express.Router();
const Student = require("../Models/student");
const auth = require("../middleware/Auth");
// Add a new student
router.post("/students", auth, async (req, res) => {
  try {
    if (req.body.role === "Admin" || req.body.role === "Training_head") {
      const {
        student_name,
        email_id,
        student_address, // Include address fields in the request body
        phone,
        course,
        batch,
        project,
        course_status,
        placement_status,
        training_head,
        placement_officer,
      } = req.body;

      const student = new Student({
        student_name,
        email_id,
        student_address, // Save address fields to the student schema
        phone,
        course,
        batch,
        project,
        course_status,
        placement_status,
        training_head,
        placement_officer,
      });

      await student.save();

      res.status(201).json({ message: "Student added successfully" });
    } else {
      res.json({ message: "Access Denied" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add student" });
  }
});

// Update student details
router.put("/students/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      student_name,
      email_id,
      student_address, // Include address fields in the request body
      phone,
      course,
      batch,
      project,
      course_status,
      placement_status,
      training_head,
      placement_officer,
    } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        student_name,
        email_id,
        student_address, // Save address fields to the student schema
        phone,
        course,
        batch,
        project,
        course_status,
        placement_status,
        training_head,
        placement_officer,
      },
      { new: true }
    );

    if (!updatedStudent) {
      res.status(404).json({ error: "Student not found" });
    } else {
      res.status(200).json({ message: "Student updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update student" });
  }
});

// Get student list
router.get("/students", auth, async (req, res) => {
  try {
    if (req.body.role === "Admin") {
      let studentlist = await Student.find();
      res.json(studentlist);
    } else {
      res.json({ message: "Access Denied" });
    }
  } catch (error) {
    res.json({ message: "Unable to load", err: error.message });
  }
});

// get students assigned to a training head or to  a placement officer
// facuty is the name/username of the trainer/placement officer
// designation=Training_head/Placement_officer
router.get("/students/:faculty/:designation", auth, async (req, res) => {
  try {
    const { faculty, designation } = req.params;
    let studentList = [];
    if (designation === "Training_head")
      studentList = await Student.find({ training_head: faculty });
    else if (designation === "Placement_officer")
      studentList = await Student.find({ placement_officer: faculty });
    if (studentList.length !== 0) {
      res.json(studentList);
    } else
      res.json({ message: "This faculty is not assigned with any student" });
  } catch (error) {
    res.json({ message: "Unable to load", err: error_message });
  }
});

// update the trainig_head/placement officer of students on deletion of the assigned faculty

router.put("/students/:faculty/:designation", auth, async (req, res) => {
  try {
    if (req.body.role === "Admin") {
      const { faculty, designation } = req.params;
      console.log(req.body);
      if (designation === "Training_head") {
        const updatedList = await Student.updateMany(
          { training_head: faculty },
          { training_head: req.body.newFaculty }
        );
        if (updatedList.matchedCount === 0) {
          res.json({ message: "No matching student found" });
        } else res.json({ message: "Updated the student documnents" });
      } else if (designation === "Placement_officer") {
        const updatedList = await Student.updateMany(
          { placement_officer: faculty },
          { placement_officer: req.body.newFaculty }
        );
        if (updatedList.matchedCount === 0) {
          res.json({ message: "No matching student found" });
        } else res.json({ message: "Updated the student documnents" });
      }
    } else {
      res.json({ message: "Access Denied" });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ message: "Unable to update", err: error.message });
  }
});

// Delete students
router.delete("/students/:id", auth, async (req, res) => {
  try {
    if (req.body.role === "Admin" || req.body.role === "Training_head") {
      const { id } = req.params;
      await Student.findByIdAndDelete(id);
      res.json({ message: "Student deleted successfully" });
    } else {
      res.json({ message: "Access Denied" });
    }
  } catch (error) {
    res.json({ message: "Unable to delete", err: error.message });
  }
});

module.exports = router;
