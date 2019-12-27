const mongoose = require('mongoose')
require("../models/Exam")
require("../models/User")
const schema = new mongoose.Schema({
  Exam: { type: mongoose.SchemaTypes.ObjectId, ref: 'Exam' },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
},{
  timestamps: true
})

module.exports = mongoose.model('ExamOrder', schema)