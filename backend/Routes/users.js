const router = require("express").Router();

const userData = require("../Models/user");

// View Trainer and placement officer
router.get("/user", async (req, res) => {
  try {
    let users = await userData.find();
    res.json(users);
  } catch (error) {
    res.json({ message: "Unable to load", err: error.message });
  }
});

// view only one
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userData.findById(id);
    res.json(user);
  } catch (error) {
    res.json({ message: "unable to find", err: error.message });
  }
});

// Adding trainer and placement officer
router.post("/user", async (req, res) => {
  try {
    console.log(req.body);
    const newUser = userData(req.body);
    await newUser.save();
    res.json({ message: "User added successfully" });
  } catch (error) {
    res.json({ message: "Unable to post" });
  }
});

// Update user info
router.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    await userData.findByIdAndUpdate(id, req.body);
    res.json({ message: "User info updated Successfully" });
  } catch (error) {
    res.json({ message: "unable to update", err: error.message });
  }
});

//Delete user

router.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await userData.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.json({ message: "unable to delete", err: error.message });
  }
});

module.exports = router;
