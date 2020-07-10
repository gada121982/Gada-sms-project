
/**
 * @param {Array} con
 * @param {Array} tran
 */
const combindContact = (con, tran) => {
  const result = []
  conversations = [...con]
  transactions = [...tran]

  let flag = conversations.length
  let count = 0

  while (flag !== 0) {
    const tempConversation = {
      _id: conversations[count].id,
      customer_phone: conversations[count].customer_phone,
      customer_name: conversations[count].customer_name,
      user_id: conversations[count].user_id,
      updatedAt: conversations[count].updatedAt,
      createdAt: conversations[count].createdAt,
      transactions: []
    }

    transactions.forEach((transaction) => {
      if (transaction.conversation_id === tempConversation._id.toString()) {
        tempConversation.transactions.push(transaction)
      }
    })

    result.push(tempConversation)
    count++
    flag--
  }

  return result
}

module.exports = combindContact
