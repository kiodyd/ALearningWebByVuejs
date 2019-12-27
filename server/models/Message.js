const mongoose = require('mongoose')
const User = require('./User')
const Course = require('./Course')
const schema = new mongoose.Schema({
  course: { type: mongoose.SchemaTypes.ObjectId, ref: 'Course'},
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
  content: { type: String },
  reply: { type: String },
},{
  timestamps: true
})

module.exports = mongoose.model('Message', schema)