const Axios = require('axios')
const jwt = require('jsonwebtoken')
const ConversationModel = require('../../../models/Conversation')
const TransactionModel = require('../../../models/Transaction')

module.exports.send = async (req, res) => {
  const TOKEN = req.cookies.user_token
  const { customerName, customerPhone, content } = req.body
  let idConversation = ''

  const userId = jwt.decode(TOKEN, process.env.PRIVATE_KEY)
  const checkExistConversation = await ConversationModel.find({ customer_phone: customerPhone, user_id: userId })

  if (checkExistConversation.length === 0) {
    const conversation = new ConversationModel({
      customer_phone: customerPhone,
      customer_name: customerName,
      user_id: userId
    })

    const conversationSaved = await conversation.save()
    idConversation = conversationSaved._id
  } else {
    idConversation = checkExistConversation[0]._id
  }

  // This is our private api
  const queryUrl = encodeURI(`${process.env.API_SMS_URL}/?u=${process.env.API_SMS_KEY}&pwd=${process.env.API_SMS_SECRET}&from=Gcalls&phone=${customerPhone}&sms=${content}`)

  const respond = await Axios.get(queryUrl)

  if (typeof respond.data === 'number') {
    const transaction = new TransactionModel({
      conversation_id: idConversation,
      content,
      status: false
    })

    try {
      await transaction.save()
      res.send({
        status: false,
        message: [`Send message fail, error code : ${respond.data}`]
      })
    } catch (e) {
      res.send({
        status: false,
        message: [`Send message fail, error code : ${respond.data}`, 'Save transaction fail']
      })
    }
    return
  }

  const transaction = new TransactionModel({
    conversation_id: idConversation,
    content,
    status: true
  })

  try {
    await transaction.save()
    res.send({
      status: true,
      message: ['Send message successful']
    })
  } catch (e) {
    res.send({
      status: false,
      message: ['Save transaction fail']
    })
  }
}
