const mongoose = require('mongoose')
const Category = require('./Category')

const schema = new mongoose.Schema({
    categories: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category'},
    title: { type: String },
    description: { type: String },
    image: { type: String },
    body: { type: String },
},
{
    timestamps: true
})

module.exports = mongoose.model('News', schema)