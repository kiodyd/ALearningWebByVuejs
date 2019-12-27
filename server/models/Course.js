const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  type: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category'},
  name: { type: String },
  description: { type: String },
  cover: { type: String },
  price: { type: Number },
  point: { type: Number },
  diffcult: { type: Number }
},{
  timestamps: true
})

module.exports = mongoose.model('Course', schema)