import * as actionType from '../constants/actionType'

const INIT = {
  lastMessage: '',
}

export default (state = INIT, action) => {

  switch (action.type) {
    case actionType.completeMessage:
      return {
        lastMessage: action.payload
      }
    default:
      return state
  }
}

