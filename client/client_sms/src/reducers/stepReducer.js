import * as actionType from '../constants/actionType'

const INIT = {
  stepActive: 1
}

export default (state = INIT, action) => {

  switch (action.type) {
    case actionType.switchStep:

      return {
        stepActive: action.payload,
      }
    default:
      return state
  }
}

