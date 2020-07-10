const { Schema, model } = require('mongoose')

const CONVERSATION = new Schema({
  customer_phone: {
    type: String,
    required: true
  },
  customer_name: {
    type: String,
    required: false
  },
  user_id: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = model('conversation', CONVERSATION, 'conversation')
