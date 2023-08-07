const express = require("express");
const router = express.Router();
const multer = require("multer");
const csvtojson = require("csvtojson");
const Student = require("../Models/student");
const auth = require("../middleware/Auth");
const userData = require("../Models/user");

// Configure multer to handle file uploads
const upload = multer();

// Define the route for bulk upload
router.post(
  "/bulk-upload",
  upload.single("csvFile"),
  auth,
  async (req, res) => {
    try {
      if (req.body.role === "Admin" || req.body.role === "Training_head") {
        // Check if there's a file attached in the request
        if (!req.file) {
          return res
            .status(400)
            .json({ error: "CSV file not found in the request" });
        }
        // Get facutly username from collection
        const faculties = await userData.find({}, "username");
        const facultyUsernames = faculties.map((faculty) => faculty.username);

        // Get the uploaded CSV file buffer
        const csvFileBuffer = req.file.buffer.toString();

        // Parse the CSV file and extract data using csvtojson
        const studentsData = await csvtojson().fromString(csvFileBuffer);

        // Check if the faculty_username already exists in faculties
        const facultyUsernamesInCSV = studentsData.reduce(
          (usernames, student) => {
            return usernames.concat([
              student.training_head,
              student.placement_officer,
            ]);
          },
          []
        );

        const nonExixtingUsernames = facultyUsernamesInCSV.filter(
          (username) => !facultyUsernames.includes(username)
        );
        console.log(nonExixtingUsernames.length);
        if (nonExixtingUsernames.length > 0) {
          return res.status(400).json({
            error:
              "The following faculty usernames are not valid: " +
              nonExixtingUsernames.join(", "),
          });
        }

        // Insert the data into the database using insertMany
        const result = await Student.insertMany(studentsData);

        // console.log("Bulk upload successful!", result);
        res
          .status(200)
          .json({ message: "Bulk upload successful!", data: result });
      } else {
        res.json({ message: "Access Denied" });
      }
    } catch (error) {
      console.log("Error uploading data:", error);
      res.status(500).json({ error: "Error uploading data" });
    }
  }
);

module.exports = router;
