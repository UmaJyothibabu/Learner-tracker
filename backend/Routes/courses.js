const router = require("express").Router();

const courseData = require("../Models/course");

// get course
router.get("/course", async (req, res) => {
  try {
    let courses = await courseData.find();
    res.json(courses);
  } catch (error) {
    res.json({ message: "Unable to load", err: error.message });
  }
});

//add new course
router.post("/course", async (req, res) => {
  try {
    console.log(req.body);
    const newCourse = courseData(req.body);
    await newCourse.save();
    res.json({ message: "Course added successfully" });
  } catch (error) {
    res.json({ message: "Unable to post" });
  }
});

// Delete course

router.delete("/course/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await courseData.findByIdAndDelete(id);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.json({ message: "unable to delete", err: error.message });
  }
});

module.exports = router;
