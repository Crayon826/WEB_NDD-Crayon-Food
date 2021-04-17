/************************************************************************************
 * WEB322 – Assignment 5 (Winter 2021)
 * I declare that this assignment is my own work in accordance with Seneca Academic
 * Policy. No part of this assignment has been copied manually or electronically from
 * any other source (including web sites) or distributed to other students.
 *
 * Name: Tim Lin
 * Student ID: 105586192
 * Course: WEB322NDD
 *
 ************************************************************************************/

const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')
const homeRouter = require('./controller/home')
const menuRouter = require('./controller/on_the_menu')
const detailRouter = require('./controller/detail')
const welcomeRouter = require('./controller/welcome')
const loginRouter = require('./controller/login')
const logoutRouter = require('./controller/logout')
const signupRouter = require('./controller/signup')
const loadDataRouter = require('./controller/load data')
const clerkRouter = require('./controller/clerk')
const customerRouter = require('./controller/customer')
const dotenv = require('dotenv')
const session = require('express-session')
const mongoose = require('mongoose')
const customerGuard = require('./middleware/customerGuard')
const clerkGuard = require('./middleware/clerkGuard')
dotenv.config({ path: './config/keys.env' })
const PORT = process.env.PORT

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database link successful')
    console.log('If you want to use the controller to add data to the db, please on the page enter: http://localhost:8080/load-data')
  })
  .catch((error) => {
    console.log('Database link failed:')
    console.log(error)
  })

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

app.engine(
  'hbs',
  hbs({
    extname: '.hbs',
    partialsDir: 'views/partials',
    helpers: {
      css: function (cssPath, options) {
        this.cssList = this.cssList || []
        this.cssList.push(cssPath)
      },
      js: function (jsPath, options) {
        this.jsList = this.jsList || []
        this.jsList.push(jsPath)
      },
    },
  })
)

app.set('view engine', 'hbs')

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
)

app.use('*', (req, res, next) => {
  res.set('Cache-Control', 'no-store')
  if (req.session.user) {
    res.locals.user = req.session.user
  }
  next()
})

app.use('/clerk', clerkGuard, clerkRouter)

app.use('/customer', customerGuard, customerRouter)

app.use('/menu', menuRouter)
app.use('/detail', detailRouter)
app.use('/welcome', welcomeRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/signup', signupRouter)
app.use('/load-data', loadDataRouter)
app.use('/', homeRouter)

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.send(err)
})

app.listen(PORT, function () {
  console.log(`Web server is up and running,port${PORT}`)
})
