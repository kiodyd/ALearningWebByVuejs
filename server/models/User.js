const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  avatar: { type: String },
  password: {
    type: String,
    select: false,
    set(val) {
      return require('bcryptjs').hashSync(val, 10)
    }
  },
  phone: { type: String },
  Email: { type: String },
  age: { type: String },
  gender: { type: Number },
  active: { type: String }
})

module.exports = mongoose.model('User', schema)