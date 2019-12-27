const mongoose = require('mongoose')
const Certificate = require('./Certificate')
const User = require('./User')
const Exam = require('./Exam')


const schema = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    certificate: { type: mongoose.SchemaTypes.ObjectId, ref: 'Certificate'},
    exam: { type: mongoose.SchemaTypes.ObjectId, ref: 'Exam'},
    level: { type: Number}
},{
    timestamps: true
  })

module.exports = mongoose.model('Issue', schema)