const { Schema, model } = require('mongoose')

const smsCategory = Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = model('sms_category', smsCategory, 'sms_category')
