
/**
 * @param {Object} transaction
 * @param {Array} conversations
 */
const addRelateFieldToTransactions = (transaction, conversations) => {
  let newTransaction = {}

  for (let i = 0; i < conversations.length; i++) {
    if (conversations[i]._id.toString() === transaction.conversation_id) {
      newTransaction = {
        content: transaction.content,
        status: transaction.status,
        customer_phone: conversations[i].customer_phone,
        customer_name: conversations[i].customer_name,
        user_id: conversations[i].user_id
      }
      return newTransaction
    }
  }
  return null
}

/**
 * @param {Array} transactions
 * @param {Array} conversations
 */

const CombineHistory = (tran, con) => {
  const arrayDist = []
  const transactions = [...tran]
  const conversations = [...con]

  transactions.forEach((transaction) => {
    transaction = addRelateFieldToTransactions(transaction, conversations)
    arrayDist.push(transaction)
  })
  return arrayDist
}

module.exports = CombineHistory
