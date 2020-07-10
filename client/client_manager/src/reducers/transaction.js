import * as type from '../constants/actionType'

const INIT = []

export default (state = INIT, action) => {
  switch (action.type) {
    case type.SHOW_TRANSACTIONS:
      return action.payload
    default:
      return state
  }
}

