const mongoose = require('mongoose')
const User = require('./User')
const Exam = require('./Exam')

const schema = new mongoose.Schema({
    answers: [ {type:String} ],
    scores: [ {type:Number} ],
    total_score: {type:Number},
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    exam: { type: mongoose.SchemaTypes.ObjectId, ref: 'Exam' },
})

module.exports = mongoose.model('ExamRecord', schema)