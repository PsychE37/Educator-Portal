const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  bookmarked:{
    type:Boolean,
    required:true
  },
  syllabus:{
    type:Schema.Types.ObjectId,
    ref:"Syllabus"
  }
});

const eventSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now(),
    required: true
  },
  endDate: {
    type: Date,
    default: Date.now() + 1000*60*60,
    required: true
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "Subjects",
  }
})

const syllabusSchema = new Schema({
  courseObjectives: {
    type: String,
    required: false,
  },
  topics: {
    type: String,
    required: false,
  },
  assignments: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  references: {
    type: String,
    required: false,
  }
})

module.exports.Subjects = mongoose.model("Subjects", subjectSchema);
module.exports.Events = mongoose.model("Events", eventSchema);
module.exports.Syllabus = mongoose.model("Syllabus", syllabusSchema);