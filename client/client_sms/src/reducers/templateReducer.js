import * as actionType from '../constants/actionType'

const INIT = {
  smsTemplates: [],
}

export default (state = INIT, action) => {
  switch (action.type) {
    case actionType.showTemplate:
      return {
        smsTemplates: action.payload
      }
    default:
      return state
  }
}

