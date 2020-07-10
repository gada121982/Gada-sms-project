const isMatchHistory = require('./filterMessageHistory')
const isMatchCategory = require('./filterMessageCategory')
const isMatchTemplate = require('./filterMessageTemplate')
const isMatchUserNormal = require('./filterUserNormal')
const isMatchUserSalesforce = require('./filterUserSalesforce')

module.exports = {
  isMatchHistory,
  isMatchCategory,
  isMatchTemplate,
  isMatchUserNormal,
  isMatchUserSalesforce
}