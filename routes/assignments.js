var express = require("express");
var router = express.Router();
const MongooseAssignmentModel = require("../models/assignment");

var dotenv = require("dotenv");
var path = require("path");
let configPath = path.join(__dirname, "../", ".env");
dotenv.config({ path: configPath });

// Firebase Auth. Initialization
var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert({
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    project_id: process.env.FIREBASE_PROJECT_ID,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

// Get UserID from Firebase
function getUserID(tokenFromClient) {
  if (tokenFromClient === null || typeof tokenFromClient === "undefined")
    return null;
  let token = tokenFromClient.replace("Bearer ", "");
  var userID = admin
    .auth()
    .verifyIdToken(token)
    .then(function (decodedToken) {
      return decodedToken.uid;
    })
    .catch((err) => {
      console.log(err);
    });
  return userID;
}

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

function isUserIdExist(userId) {
  if (userId === null || typeof userId === "undefined") {
    return false;
  } else {
    return true;
  }
}

// Get all assignments
router.get("/assignments", async (req, res) => {
  console.log(req.headers.authorization); // !!!!!!!!!!!!!!!!!! DELETE
  let userId = await getUserID(req.headers.authorization);
  if (isUserIdExist(userId)) {
    MongooseAssignmentModel.find({}, (err, data) => {
      if (err) res.send(err);
      res.json(data);
    });
  } else {
    res.json(401, { errorMessage: "You are not authorized" });
  }
});

// Create an assignment
router.post("/assignments", async (req, res) => {
  let assignment = req.body;
  if (!isValid(assignment)) {
    res.json(400, {});
  } else {
    let userId = await getUserID(req.headers.authorization);
    if (isUserIdExist(userId)) {
      assignment.userId = userId;
      let newAssignment = new MongooseAssignmentModel(assignment);
      newAssignment.save((err, data) => {
        if (err) res.send(err);
        res.json(201, { message: "Assignment was successfully created" });
      });
    } else {
      res.json(401, { errorMassage: "You are not authorized" });
    }
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
