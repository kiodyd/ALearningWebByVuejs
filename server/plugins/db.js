module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/a-learning-web', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
}