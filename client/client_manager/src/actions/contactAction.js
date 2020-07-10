import * as type from '../constants/actionType'

export const switchContact = contact => {
  return {
    type: type.SELECT_CONTACT,
    payload: contact
  }
}