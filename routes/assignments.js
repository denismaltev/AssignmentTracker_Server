var express = require("express");
var router = express.Router();
const MongooseAssignmentModel = require("../models/assignment");

var dotenv = require("dotenv");
var path = require("path");
let configPath = path.join(__dirname, "../", ".env");
dotenv.config({ path: configPath });

var MongoClient = require("mongodb").MongoClient;
var db_server = process.env.DB_SERVER || "localhost";
var url = "mongodb://" + db_server + ":27017";
const ObjectId = require("mongodb").ObjectID;

// Get all assignments
router.get("/assignments", (req, res) => {
  MongooseAssignmentModel.find({}, (err, data) => {
    if (err) res.send(err);
    res.json(data);
  });
});

// // Get all assignments
// router.get("/assignments", function(req, res, next) {
//   //res.send("ASSIGNMENTS API");
//   MongoClient.connect(url, function(connecterr, db) {
//     if (connecterr) throw connecterr;
//     var dbo = db.db("assignments"); //Base Name
//     dbo
//       .collection("assignments") // Table name
//       .find({})
//       .toArray(function(err, data) {
//         if (err) res.send(err);
//         res.json(data);
//         db.close();
//       });
//   });
// });

// // Get ONE assignment by Id
// router.get("/assignments/:id", function(req, res, next) {
//   MongoClient.connect(url, function(connecterr, db) {
//     if (connecterr) throw connecterr;
//     var dbo = db.db("assignments");
//     const id = new ObjectId(req.params.id);
//     var query = { _id: id };
//     dbo
//       .collection("assignments")
//       .find(query)
//       .toArray(function(err, data) {
//         if (err) res.send(err);
//         res.json(data);
//         db.close();
//       });
//   });
// });

// Create an assignment
router.post("/assignments");

module.exports = router;
