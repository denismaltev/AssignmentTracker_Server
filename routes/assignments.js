var express = require("express");
var router = express.Router();

var dotenv = require("dotenv");
var path = require("path");
let configPath = path.join(__dirname, "../", ".env");
dotenv.config({ path: configPath });

var MongoClient = require("mongodb").MongoClient;
var db_server = process.env.DB_SERVER || "localhost";
var url = "mongodb://" + db_server + ":27017";
const ObjectId = require("mongodb").ObjectID;

// Get all assignments
router.get("/assignments", function(req, res, next) {
  //res.send("ASSIGNMENTS API");
  MongoClient.connect(url, function(connecterr, db) {
    if (connecterr) throw connecterr;
    var dbo = db.db("assignments"); //Base Name
    dbo
      .collection("assignments") // Table name
      .find({})
      .toArray(function(err, data) {
        if (err) res.send(err);
        res.json(data);
        db.close();
      });
  });
});
