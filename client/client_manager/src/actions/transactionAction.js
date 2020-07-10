import * as type from '../constants/actionType'

export const switchTransactions = contact => {
  return {
    type: type.SHOW_TRANSACTIONS,
    payload: contact
  }
}