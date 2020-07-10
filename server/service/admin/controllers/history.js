const Transaction = require('../../../models/Transaction')
const Conversation = require('../../../models/Conversation')
const CombineHistory = require('../utils/combineHistory')

module.exports.getHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find()
    const conversations = await Conversation.find()

    const data = CombineHistory(transactions, conversations)
    res.send({
      status: true,
      message: data
    })
    return
  } catch (e) {
    res.send({
      status: false
    })
  }
}
