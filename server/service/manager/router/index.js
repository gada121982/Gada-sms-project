const manage = require('../controllers/manage')
const express = require('express')
const app = express()

app.get('/', manage.renderMangePage)
app.get('/api/allcontact', manage.getAllContact)

module.exports = app
