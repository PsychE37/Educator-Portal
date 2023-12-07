const { json } = require("body-parser");
var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Model = require("../models/Utils");

router.post('/updateSyllabus', (req, res) => {
  Model.Syllabus.findByIdAndUpdate(req.body.id, req.body.details, function (err, result) {
    if(err) return res.status(404).send(err);
    else res.status(200).send(result);
  });
})

router.post("/getSyllabus", (req, res) => {
  const id = req.body.syllabus;
  Model.Syllabus.findById(id, function (err, result) {
    if (err) {
      return res.status(404).send(err);
    } else {
      res.status(200).send(result);
    }
  });
})

router.post("/getEvents", (req, res) => {
  Model.Events.find({}, function (err, result) {
    if (err) {
      return res.status(404).send(err);
    } else {
      res.status(200).send(result);
    }
  });
})

router.post("/addEvent", (req, res) => {
  const { title, description, startDate, endDate, subject } = req.body;
  const newEvent = new Model.Events({
    title,
    description,
    startDate,
    endDate,
    subject
  });
  newEvent
    .save()
    .then((event) => {
      res.status(200).json(event);
    })
    .catch((err) => {
      res.status(400).send(err);
      console.log(err);
    });
})

router.post("/getSubjects", (req, res) => {
  Model.Subjects.find({}, function (err, result) {
    if (err) {
      return res.status(404).send(err);
    } else {
      res.status(200).send(result);
    }
  });
})

router.post("/toggleBookmark", async (req, res) => {
  const id = req.body.id;
  const Bookmarked = !req.body.bookmarked;
  const result = await Model.Subjects.findByIdAndUpdate(id, [{ $set: {Bookmarked: Boolean(Bookmarked) } }]);
  res.status(200).send("Nice");
});

module.exports = router;