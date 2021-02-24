const express = require('express')
const router = express.Router()
const path = require('path')
const { getMeals, getTopMeals } = require('../mealkits')
const topMeals = getTopMeals()
const sgMail = require('@sendgrid/mail')
const { info } = require('console')
/* GET home page. */
router.get('/', function (req, res, next) {
  return res.render('index', {
    topMeals,
    cssPath: 'index',
  })
})
router.get('/menu', function (req, res) {
  const { category } = req.query
  const result = getMeals(category)
  return res.render('menu', {
    category,
    result,
    cssPath: 'menu',
  })
})
router.get('/login', function (req, res) {
  return res.render('login', {
    cssPath: 'signup',
  })
})
router.get('/signup', function (req, res) {
  return res.render('signup', {
    cssPath: 'signup',
  })
})
router.post('/signup', function (req, res) {
  const { firstName, lastName, email, pwd } = req.body
  const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  const pwdReg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9]){6,12}$/
  const showFirstName = firstName.trim().length > 0 ? false : true
  const showLastName = lastName.trim().length > 0 ? false : true
  const showEmail = !emailReg.test(email)
  const showPwd = !pwdReg.test(pwd)
  if (showFirstName || showLastName || showEmail || showPwd) {
    return res.render('signup', {
      firstName,
      lastName,
      email,
      pwd,
      showFirstName,
      showLastName,
      showEmail,
      showPwd,
      cssPath: 'signup',
    })
  } else {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY)
    // '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'
    const msg = {
      to: email,
      from: 'plin23@myseneca.ca ',
      subject: 'Contact Us From Submission',
      html: `Welcome to Crayon food!<br>
      ${firstName} ${lastName}<br>
     Your Email Address is: ${email}<br>
     `,
    }
    sgMail
      .send(msg)
      .then(() => {
        return res.redirect(`/welcome/${firstName} ${lastName}`)
      })
      .catch((err) => {
        console.log(`Error ${err}`)
        res.send(Error)
      })
  }
})
router.post('/login', function (req, res) {
  const { email, pwd } = req.body
  let showEmailTips = false
  let showPwdTips = false
  if (email.trim().length > 0 && pwd.trim().length > 0) {
    return res.redirect(`/welcome/${email}`)
  }
  if (email.trim().length === 0) {
    showEmailTips = true
  }
  if (pwd.trim().length === 0) {
    showPwdTips = true
  }
  return res.render('login', {
    email,
    pwd,
    showEmailTips,
    showPwdTips,
    cssPath: 'signup',
  })
})
router.get('/welcome/:info', function (req, res) {
  const { info } = req.params
  return res.render('welcome', { info, cssPath: 'welcome' })
})
module.exports = router
