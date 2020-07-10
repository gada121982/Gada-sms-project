const proxy = require('../service/proxy/router/index')
const message = require('../service/message/router/index')
const auth = require('../service/authencation/router/index')
const manage = require('../service/manager/router/index')
const index = require('../service/index/router')
const admin = require('../service/admin/routers/index')

module.exports = {
  proxy,
  message,
  auth,
  manage,
  index,
  admin
}
