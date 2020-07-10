import * as type from '../constants/actionType'

export const submitContact = contact => {
  return {
    type: type.completeContact,
    payload: contact
  }
}