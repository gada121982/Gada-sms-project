const jsforce = require('jsforce')
const JWT = require('jsonwebtoken')
const UserSF = require('../../../models/UserSF')

require('dotenv').config()

let loginUrl = ''

module.exports.getLogin = (req, res) => {
  res.render('loginsf')
}

module.exports.postLogin = (req, res) => {
  loginUrl = req.body.loginurl

  try {
    const authorzation = new jsforce.OAuth2({
      loginUrl: loginUrl,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.CALLBACK_URL
    })
    res.redirect(authorzation.getAuthorizationUrl({ scrope: 'id' }))
  } catch (error) {
    res.redirect('/auth/loginsf')
  }
}

module.exports.callback = async (req, res) => {
  let userInfo = {}
  let connection = {}

  const OAuth2 = new jsforce.OAuth2({
    loginUrl,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.CALLBACK_URL
  })

  try {
    connection = new jsforce.Connection({ oauth2: OAuth2 })
    if (!req.query.code) {
      res.status(500).send('Failed to get authorization code')
      return
    }
  } catch (e) {
    res.redirect('/auth/loginsf')
    return
  }

  try {
    userInfo = await connection.authorize(req.query.code)
  } catch (e) {
    res.redirect('/auth/loginsf')
    return
  }

  const checkExistUserFlag = await UserSF.countDocuments({ user_id: userInfo.id })

  if (checkExistUserFlag === 1) {
    await UserSF.updateOne({ user_id: userInfo.id }, {
      user_id: userInfo.id,
      instance_url: connection.instanceUrl,
      access_token: connection.accessToken
    })
  } else if (checkExistUserFlag === 0) {
    const userSafesfoce = new UserSF({
      user_id: userInfo.id,
      instance_url: connection.instanceUrl,
      access_token: connection.accessToken
    })

    await userSafesfoce.save()
  }

  // generate token
  const TOKEN = JWT.sign({ user_id: userInfo.id }, process.env.PRIVATE_KEY)
  res.cookie('access_token', TOKEN, {
    secure: false,
    maxAge: 86400000 * 5
  }).render('message')
}
