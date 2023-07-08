const router = require("express").Router();

const userData = require("../Models/user");
router.post("/user", async (req, res) => {
  try {
    console.log(req.body);
    res.send("Posted");
  } catch (error) {}
});
module.exports = router;
