import * as actionType from '../constants/actionType'

const INIT = {
  customerName: '',
  phoneNumber: ''
}

export default (state = INIT, action) => {

  switch (action.type) {
    case actionType.completeContact:
      return {
        customerName: action.payload.customerName,
        phoneNumber: action.payload.phoneNumber
      }
    default:
      return state
  }
}

