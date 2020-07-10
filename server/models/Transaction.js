const { Schema, model } = require('mongoose')

const TRANSACTION = new Schema({
  conversation_id: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
})

module.exports = model('transaction', TRANSACTION, 'transaction')
