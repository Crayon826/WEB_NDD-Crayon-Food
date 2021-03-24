/************************************************************************************
 * WEB322 – Assignment 3 (Winter 2021)
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
 const indexRouter = require('./routes/index')
 const dotenv = require('dotenv')
 const session = require('express-session')
 const mongoose = require('mongoose')
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
 })
 .catch((error) => {
   console.log('Database link failed:')
   console.log(error)
 })

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

app.engine('hbs', hbs({ extname: '.hbs', partialsDir: 'views/partials' }))

app.set('view engine', 'hbs')

app.use(
 session({
   secret: process.env.SESSION_SECRET,
   resave: true,
   saveUninitialized: true,
 })
)

app.use('/', indexRouter)

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500)
  res.send(err)
})

app.listen(PORT, function () {
  console.log(`web Server is up and running, post ${PORT}`)
})
