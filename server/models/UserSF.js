const { Schema, model } = require('mongoose')

const USERSF = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  instance_url: {
    type: String,
    required: true
  },
  access_token: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = model('user_sf', USERSF, 'user_sf')
