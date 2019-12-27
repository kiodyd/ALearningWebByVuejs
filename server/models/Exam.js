const mongoose = require('mongoose')
require('./Category')
const schema = new mongoose.Schema({
  type: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category'},
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  questions: [{
    question_title: { type: String },
    question_data: { type: String }
  }]
},
{
  timestamps: true
})

module.exports = mongoose.model('Exam', schema)