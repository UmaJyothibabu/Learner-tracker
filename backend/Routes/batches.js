const router = require("express").Router();

const batchData = require("../Models/batch");

// get batch
router.get("/batch", async (req, res) => {
  try {
    let courses = await batchData.find();
    res.json(courses);
  } catch (error) {
    res.json({ message: "Unable to load", err: error.message });
  }
});

//add new batch
router.post("/batch", async (req, res) => {
  try {
    console.log(req.body);
    const newBatch = batchData(req.body);
    await newBatch.save();
    res.json({ message: "Batch added successfully" });
  } catch (error) {
    res.json({ message: "Unable to post" });
  }
});

// update batch
router.put("/batch/:id", async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    await batchData.findByIdAndUpdate(id, req.body);
    res.json({ message: "batch info updated Successfully" });
  } catch (error) {
    res.json({ message: "unable to update", err: error.message });
  }
});

// Delete course

router.delete("/batch/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await batchData.findByIdAndDelete(id);
    res.json({ message: "Batch deleted successfully" });
  } catch (error) {
    res.json({ message: "unable to delete", err: error.message });
  }
});

module.exports = router;
