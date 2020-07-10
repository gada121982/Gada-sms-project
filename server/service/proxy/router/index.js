const express = require('express')
const proxy = require('../controller/proxy')

const app = express()

app.post('/send', proxy.send)

module.exports = app
