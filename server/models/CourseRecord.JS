const mongoose = require('mongoose')
require("../models/Course")
require("../models/User")
const schema = new mongoose.Schema({
  Course: { type: mongoose.SchemaTypes.ObjectId, ref: 'Course' },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  chapters: [ { type: Boolean } ],
  statu: { type: Boolean }
},{
  timestamps: true
})

module.exports = mongoose.model('CourseRecord', schema)