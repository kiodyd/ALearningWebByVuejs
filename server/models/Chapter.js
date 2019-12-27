const mongoose = require('mongoose')
require('./Course')
const schema = new mongoose.Schema({
  course: { type: mongoose.SchemaTypes.ObjectId, ref: 'Course'},
  name: { type: String },
  description: { type: String },
  file: { type: String },
})

module.exports = mongoose.model('Chapter', schema)