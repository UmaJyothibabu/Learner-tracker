const router = require("express").Router();

const projectData = require("../Models/project");

// get course
router.get("/project", async (req, res) => {
  try {
    let projects = await projectData.find();
    res.json(projects);
  } catch (error) {
    res.json({ message: "Unable to load", err: error.message });
  }
});

//add new course
router.post("/project", async (req, res) => {
  try {
    console.log(req.body);
    const newProject = projectData(req.body);
    await newProject.save();
    res.json({ message: "Project added successfully" });
  } catch (error) {
    res.json({ message: "Unable to post" });
  }
});

// Delete course

router.delete("/project/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await projectData.findByIdAndDelete(id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.json({ message: "unable to delete", err: error.message });
  }
});

module.exports = router;
