const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../../models/User')

module.exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    message: null
  })
}

module.exports.postLoginPage = async (req, res) => {
  const { username, password } = req.body

  // validate
  const userInformation = await User.findOne({ username })

  if (!userInformation) {
    res.render('login', {
      message: 'Account not valid'
    })
    return
  }

  // if exist user => check password
  const isValidPassword = await bcrypt.compare(password, userInformation.password)

  if (!isValidPassword) {
    res.render('login', {
      message: 'Account not valid'
    })
    return
  }

  const TOKEN = jwt.sign(userInformation._id.toString(), process.env.PRIVATE_KEY)

  if (userInformation.role) {
    res.cookie('admin_token', TOKEN, {
      secure: false,
      maxAge: 86400000 * 10
    }).redirect('/admin')
    return
  }

  res.cookie('user_token', TOKEN, {
    secure: false,
    maxAge: 86400000 * 10
  }).redirect('/')
}

module.exports.postLogout = (req, res) => {
  res.clearCookie('user_token').clearCookie('access_token').send({
    status: true
  })
}
