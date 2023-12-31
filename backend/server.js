const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;
const DB_NAME = "eduportal";

// routes
var UserRouter = require("./routes/Users");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', false);

// Connection to MongoDB
mongoose.connect(
  "mongodb+srv://admin:hTh8udByYgU8j7E@eduportalcluster0.j1vv0fi.mongodb.net/" + DB_NAME,
  { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully !");
});

app.use("/user", UserRouter);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
