const jwt = require('jsonwebtoken')
const Conversation = require('../../../models/Conversation')
const Transaction = require('../../../models/Transaction')
const combineContact = require('../utils/combineContact')
const User = require('../../../models/User')

module.exports.renderMangePage = (req, res) => {
  res.render('manage')
}

module.exports.getAllContact = async (req, res) => {
  const TOKEN = req.cookies.user_token

  const userId = jwt.decode(TOKEN, process.env.PRIVATE_KEY)

  // check valid user
  const isValidUser = await User.findById(userId)

  if (!isValidUser) {
    res.send({
      status: false,
      message: ['token not valid']
    })
    return
  }

  const conversations = await Conversation.find({ user_id: userId })
  const conversationsId = conversations.map((conversation, index) => {
    return conversation._id
  })
  const transactions = await Transaction.find({ conversation_id: { $in: conversationsId } })

  // combine object between conversations and transactions
  const contacts = combineContact(conversations, transactions)

  res.send({
    status: true,
    message: contacts
  })
}
