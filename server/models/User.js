const { Schema, model } = require('mongoose')

const USER = new Schema({
  role: {
    type: Boolean,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = model('user', USER, 'user')
