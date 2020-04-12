var express = require("express");
var router = express.Router();
const MongooseAssignmentModel = require("../models/assignment");

var admin = require("firebase-admin");
var dotenv = require("dotenv");
var path = require("path");
let configPath = path.join(__dirname, "../", ".env");
dotenv.config({ path: configPath });

// Validation
function isValid(assignment) {
  if (
    assignment.title !== null &&
    assignment.description !== null &&
    assignment.isDone !== null &&
    assignment.date !== null
  ) {
    return true;
  } else return false;
}

// Get all assignments
router.get("/assignments", (req, res) => {
  MongooseAssignmentModel.find({}, (err, data) => {
    if (err) res.send(err);
    res.json(data);
  });
});

// Create an assignment
router.post("/assignments", (req, res) => {
  var assignment = req.body;
  if (!isValid(assignment)) {
    res.json(400, {});
  } else {
    let newAssignment = new MongooseAssignmentModel(assignment);
    newAssignment.save((err, data) => {
      if (err) res.send(err);
      res.json(201, data);
    });
  }
});

// Delete an assignment
router.delete("/assignments/:id", (req, res) => {
  MongooseAssignmentModel.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) res.send(err);
    res.json(204, data);
  });
});

// Put an assignment
router.put("/assignments/:id", (req, res) => {
  var assignment = req.body;
  if (!isValid(assignment)) {
    res.json(400, {});
  } else {
    MongooseAssignmentModel.findOneAndUpdate(
      { _id: req.params.id },
      assignment,
      { new: true },
      (err, data) => {
        if (err) res.send(err);
        res.json(200, data);
      }
    );
  }
});

module.exports = router;
