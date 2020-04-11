var express = require("express");
var router = express.Router();
const MongooseAssignmentModel = require("../models/assignment");

var dotenv = require("dotenv");
var path = require("path");
let configPath = path.join(__dirname, "../", ".env");
dotenv.config({ path: configPath });

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
  let newAssignment = new MongooseAssignmentModel(assignment);
  newAssignment.save((err, data) => {
    if (err) res.send(err);
    res.json(201, data);
  });
});

// Delete an assignment
router.delete("/assignments/:id", (req, res) => {
  MongooseAssignmentModel.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) res.send(err);
    res.json(204);
  });
});

module.exports = router;
