const User = require('../controllers/user')
const History = require('../controllers/history')
const UserSf = require('../controllers/usersf')
const express = require('express')
const app = express()

const template = require('../controllers/template')
const category = require('../controllers/category')

app.get('/', (req, res) => {
  res.render('admin')
})

app.get('/history', History.getHistory)
app.get('/usersf/all', UserSf.getAll)

app.post('/user/add', User.add)
app.post('/user/delete', User.delete)
app.post('/user/edit', User.edit)
app.get('/user/all', User.getAll)

app.post('/template/add', template.addTemplate)
app.post('/template/update', template.patchTemplate)
app.post('/template/delete', template.delTemplate)
app.get('/template/all', template.getAllTemplate)

app.post('/category/add', category.addCategory)
app.post('/category/delete', category.delCategory)
app.get('/category/getall', category.getCategory)
module.exports = app
