const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
