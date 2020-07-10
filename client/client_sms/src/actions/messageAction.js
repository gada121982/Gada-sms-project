import * as type from '../constants/actionType'

export const showTemplate = smsTemplates => {
  return {
    type: type.showTemplate,
    payload: smsTemplates
  }
}

export const commitMessage = message => {
  return {
    type: type.completeMessage,
    payload: message
  }
}

