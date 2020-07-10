const BASE_URL = 'http://localhost:8000/'


module.exports.Contact = {
  getContacts: BASE_URL + 'api/message/contactlist'
}

module.exports.Category = {
  getAllCategory: BASE_URL + 'api/message/category/getall'
}

module.exports.Template = {
  getTemplesByCategory: BASE_URL + 'api/message/template/getbycategory'
}

module.exports.Proxy = {
  sendMessage: BASE_URL + 'api/proxy/send'
}

module.exports.redirectToLoginPage = BASE_URL + 'auth/login'

module.exports.redirectToLoginSfPage = BASE_URL + 'auth/loginsf'

module.exports.redirectToMessagePage = BASE_URL + 'message'