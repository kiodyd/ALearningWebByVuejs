const mongoose = require('mongoose')
require('./News')

const schema = new mongoose.Schema({
    name: { type: String },
    items: [{
        image: { type: String },
        news: { type: mongoose.SchemaTypes.ObjectId, ref: 'News' }
    }]
})

module.exports = mongoose.model('Ad', schema)