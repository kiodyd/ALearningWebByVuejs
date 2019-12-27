const mongoose = require('mongoose')
const User = require('./User')
const schema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
  points: { type: Number },
  studyCoins: { type: Number },
})

module.exports = mongoose.model('StudyCard', schema)