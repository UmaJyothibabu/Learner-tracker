const mongoose = require("mongoose");

const batchSchema = mongoose.Schema({
  batch_name: {
    type: String,
    required: true,
  },
});
const batchData = mongoose.model("batch", batchSchema);
module.exports = batchData;
