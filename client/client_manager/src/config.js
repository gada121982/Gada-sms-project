const BASE_URL = 'http://localhost:8000/'


module.exports.authConfig = {
  sendLogin: BASE_URL + 'auth/login',
  sendLogout: BASE_URL + 'auth/logout'
}

module.exports.Conversation = {
  getAllContact: BASE_URL + 'api/allcontact'
}

module.exports.Proxy = {
  send: BASE_URL + 'api/proxy/send'
}

module.exports.redirectToMessage = {
  redirectToMessagePage: BASE_URL + 'message'
}

module.exports.redirectToLoginPage = BASE_URL + 'auth/login'