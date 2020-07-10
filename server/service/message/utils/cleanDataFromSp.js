
const isValidName = (name) => {
  const regex = /[tT][eE][sS][tT]/g
  if (name === 'unfinished Contact' || regex.test(name)) {
    return false
  }
  return true
}

const checkValidPhoneNumber = (phoneNumber) => {
  if (phoneNumber.length > 13 || phoneNumber.length < 10) {
    return false
  }
  return phoneNumber
}

// return phone number if 1 phone number within this list valid , instead return false
const getUniquePhoneNumberValid = (phoneNumber) => {
  let arrayPhoneNumber = []
  let i = 0
  // there are list phone number
  if (phoneNumber.includes(';')) {
    // just pick 1 phone number
    arrayPhoneNumber = phoneNumber.split(';')
    for (i; i < arrayPhoneNumber.length; i++) {
      return checkValidPhoneNumber(arrayPhoneNumber[i]) ? arrayPhoneNumber[i] : false
    }
    return false
  }
  // just 1 phone number
  return checkValidPhoneNumber(phoneNumber) === false ? false : phoneNumber
}

const removeUnuseFied = (data) => {
  const finishData = []
  let i = 0

  for (i; i < data.length; i++) {
    const fieldUseful = {
      customerName: data[i].Name,
      phoneNumber: data[i].MobilePhone
    }
    finishData.push(fieldUseful)
  }

  return finishData
}

const cleanDataFromSalesforce = (data) => {
  const dataClean = []
  let isValidPhone
  let i = 0
  for (i; i < data.length; i++) {
    if (isValidName(data[i].Name) && data[i].MobilePhone !== null) {
      // pick fied has valid phone number
      isValidPhone = getUniquePhoneNumberValid(data[i].MobilePhone)
      data[i].MobilePhone = isValidPhone
      if (isValidPhone !== false) {
        dataClean.push(data[i])
      }
    }
  }

  return removeUnuseFied(dataClean)
}

module.exports = cleanDataFromSalesforce
