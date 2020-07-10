const { Schema, model } = require('mongoose')

const smsTemplate = Schema({
  content: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  tag: Array
}, {
  timestamps: true
})

module.exports = model('sms_template', smsTemplate, 'sms_template')
