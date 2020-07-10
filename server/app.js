const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const rfs = require('rotating-file-stream')
const router = require('./router/index')
const { join } = require('path')
const Middleware = require('./middlewares/authentication')
require('dotenv').config()

const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: join(__dirname, 'log')
})

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(cors())
app.use(helmet())
app.use(morgan('combined', { stream: accessLogStream }))
app.use(cookieParser(process.env.COOKIE_KEY))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('connect dbs succesfully !')
  })
  .catch(err => {
    console.log(`we have an error: ${err}`)
    process.exit()
  })

app.use('/auth', router.auth)
app.use('/admin', Middleware.authAdmin, router.admin)
app.use('/api/message', Middleware.authManage, router.message)
app.use('/api/proxy', Middleware.authManage, router.proxy)
app.use('/message', Middleware.authManage, router.index)
app.use('/', Middleware.authManage, router.manage)
app.get('/admin/*', (req, res) => {
  res.redirect('/admin')
})
module.exports = app
