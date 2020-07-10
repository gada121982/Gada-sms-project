const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports.authManage = async (req, res, next) => {
  let TOKEN = req.cookies.user_token
  if (!TOKEN) {
    TOKEN = req.cookies.admin_token
  }

  if (!TOKEN) {
    res.redirect('/auth/login')
    return
  }

  let userId = ''

  try {
    userId = jwt.decode(TOKEN, process.env.PRIVATE_KEY)
  } catch (e) {
    res.redirect('/auth/login')
    return
  }

  const userInformation = await User.findById(userId)

  if (!userInformation) {
    res.redirect('/auth/login')
    return
  }

  if (userInformation.role) {
    res.redirect('/admin')
    return
  }

  next()
}

module.exports.authAdmin = async (req, res, next) => {
  const TOKEN = req.cookies.admin_token
  let adminId = ''

  if (TOKEN) {
    adminId = jwt.decode(TOKEN, process.env.PRIVATE_KEY)

    if (adminId) {
      try {
        const checkIfAdmin = await User.findById(adminId)
        if (checkIfAdmin.role) {
          next()
        }
      } catch (e) {
        res.redirect('/auth/login')
      }
    }
    return
  }
  res.send('404 page not found !')
}
