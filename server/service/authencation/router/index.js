const express = require('express')
const app = express()
const authSalesforce = require('../controllers/AuthSalesforce')
const authManage = require('../controllers/AuthManage')
const authAdmin = require('../controllers/AuthAdmin')

app.get('/loginsf', authSalesforce.getLogin)
app.post('/loginsf', authSalesforce.postLogin)
app.get('/loginsf/callback', authSalesforce.callback)

app.get('/login', authManage.getLoginPage)
app.post('/login', authManage.postLoginPage)
app.post('/logout', authManage.postLogout)

app.post('/admin/logout', authAdmin.logout)

module.exports = app
