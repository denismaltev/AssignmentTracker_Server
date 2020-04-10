var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var index = require("./routes");
var assignments = require("./routes/assignments");
var dotenv = require("dotenv");
var path = require("path");
var cors = require("cors");
var app = express();

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/assignments";

// Environment variables
let confPath = path.join(__dirname, ".env");
dotenv.config({ path: confPath });
var port = process.env.PORT || 3000;
var db_server = process.env.DB_SERVER || "localhost";

// View engine
var ejsEngine = require("ejs-locals");
app.engine("ejs", ejsEngine); // support master pages
app.set("view engine", "ejs"); // ejs view engine

// Set static folder
app.use(express.static(path.join(__dirname, "client")));

// Body parser middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", index);
app.use("/api", assignments);
app.listen(port, function() {
  console.log("Server started on port: " + port);
  console.log("Using mongo database on server: " + db_server);
});
