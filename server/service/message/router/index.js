const contactFromSalesforce = require('../controllers/ContactFromSalesforce')
const smsTemplate = require('../controllers/MessageTemplate')
const smsCategory = require('../controllers/MessageCategory')

const express = require('express')
const app = express()

// get data from salesforce
app.get('/contactlist', contactFromSalesforce.getContact)

// category api
app.get('/category/getall', smsCategory.getCategory)

// template api
app.get('/template/all', smsTemplate.getAllTemplate)
app.post('/template/getbycategory', smsTemplate.getTemplateByCategoryName)

module.exports = app
