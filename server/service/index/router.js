const express = require('express')
const JWT = require('jsonwebtoken')
const UserSF = require('../../models/UserSF')

const app = express()

app.get('/', async (req, res) => {
  const TOKEN = req.cookies.access_token
  let validateObject = {}

  if (TOKEN) {
    try {
      validateObject = JWT.verify(TOKEN, process.env.PRIVATE_KEY)
    } catch (e) {
      res.redirect('/auth/loginsf')
      throw new Error('In valid token')
    }

    const checkValidTokenFlag = await UserSF.countDocuments({ user_id: validateObject.user_id })
    if (checkValidTokenFlag === 1) {
      res.render('message')
      return
    }
  }
  res.redirect('/auth/loginsf')
})

module.exports = app
