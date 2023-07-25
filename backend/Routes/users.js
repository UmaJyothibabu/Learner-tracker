const router = require("express").Router();
const jwt = require("jsonwebtoken");
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

// Getting list of trainers/placement officers
router.get("/user/:designation", async (req, res) => {
  try {
    let { designation } = req.params;
    let users = await userData.find({ designation: designation });
    if (users.length !== 0) {
      res.json(users);
    }
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

// Updating the course/batch array upon selecting as substitute
router.put("/user/:username/:designation", async (req, res) => {
  try {
    let { username, designation } = req.params;
    if (designation === "Training_head") {
      await userData.updateOne(
        { username: username },
        { $addToSet: { course: req.body } }
      );
      res.json({ message: "User info updated Successfully" });
    } else if (designation === "Placement_officer") {
      await userData.updateOne(
        { username: username },
        { $addToSet: { batch: req.body } }
      );
      res.json({ message: "User info updated Successfully" });
    }
  } catch (error) {
    console.log(error.message);
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

// login router

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let user = await userData.findOne({
    username: username,
  });
  console.log(user);
  if (!user) res.json({ message: "User not found" });
  try {
    if (user.password === password) {
      jwt.sign(
        { email: username, id: user._id, role: user.designation },
        "ictklt",
        { expiresIn: "1d" },
        (err, token) => {
          if (err) {
            res.json({ message: "token not generated" });
          } else {
            res.json({
              message: "Login Successfully",
              token: token,
              data: user,
            });
          }
        }
      );
    } else {
      res.json({ message: "Login failed" });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
