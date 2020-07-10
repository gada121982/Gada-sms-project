import * as type from '../constants/actionType'

export const switchStep = stepActive => {

  return {
    type: type.switchStep,
    payload: stepActive
  }
}