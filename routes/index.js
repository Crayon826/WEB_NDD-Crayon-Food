const express = require('express')
const router = express.Router()
const path = require('path')
const { getMeals, getTopMeals } = require('../mealkits')
const topMeals = getTopMeals()
const sgMail = require('@sendgrid/mail')
const User = require('../model/user')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const loginGuard = require('../middleware/loginGuard')
router.get('*', (req, res, next) => {
    const user = req.session.user
    if (user) {
      res.locals.user = user
    }
    res.header('Cache-Control', 'no-store')
    res.header('Expires', 0)
    res.header('Pragma', 'no-cache')
    next()
  })
router.get('/', (req, res, next) => {
  return res.render('index', {
    topMeals,
    cssPath: 'index',
    user: res.locals.user,
  })
})
router.get('/menu', (req, res) => {
  const { category } = req.query
  const result = getMeals(category)
  return res.render('menu', {
    category,
    result,
    cssPath: 'menu',
    user: res.locals.user,
  })
})
router.get('/login', (req, res) => {
  return res.render('login', {
    err_msg: '',
    cssPath: 'signup',
    user: res.locals.user,
  })
})
router.get('/signup', (req, res) => {
  return res.render('signup', {
    cssPath: 'signup',
    user: res.locals.user,
  })
})
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, pwd } = req.body
    const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    const pwdReg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9]){6,12}$/
    const showFirstName = firstName.trim().length > 0 ? false : true
    const showLastName = lastName.trim().length > 0 ? false : true
    const showEmail = !emailReg.test(email)
    const showPwd = !pwdReg.test(pwd)
    const isEmailExist = await User.find({ email })
    if (
      showFirstName ||
      showLastName ||
      showEmail ||
      showPwd ||
      isEmailExist.length
    ) {
      return res.render('signup', {
        firstName,
        lastName,
        email,
        pwd,
        showFirstName,
        showLastName,
        showEmail,
        showPwd,
        isEmailExist,
        cssPath: 'signup',
      })
    } else {
      await User.create({
        firstName,
        lastName,
        email,
        pwd: bcrypt.hashSync(pwd, salt),
      })
      sgMail.setApiKey(process.env.SEND_GRID_API_KEY)
      await sgMail.send({
        to: email,
        from: 'plin23@myseneca.ca ',
        subject: 'Contact Us From Submission',
        html: `Welcome to Crayon food!<br>
      ${firstName} ${lastName}<br>
     Your Email Address is: ${email}<br>
     `,
      })
      return res.redirect(`/welcome/${firstName} ${lastName}`)
    }
  } catch (err) {
    console.log(err)
    res.send(err)
  }
})
router.post('/login', async (req, res) => {
  try {
    const { email, pwd, role } = req.body
    let showEmailTips = email.trim().length === 0 ? true : false
    let showPwdTips = pwd.trim().length === 0 ? true : false

    if (showEmailTips || showPwdTips) {
      return res.render('login', {
        email,
        pwd,
        showEmailTips,
        showPwdTips,
        cssPath: 'signup',
      })
    } else {
      const user = await User.findOne({
        email,
      })

      if (user && bcrypt.compareSync(pwd, user.pwd)) {
        req.session.user = user
        req.session.role = role
        return res.redirect(`/${role}`)
      } else {
        return res.render('login', {
          err_msg: 'Sorry, you entered an invalid email or password',
          cssPath: 'signup',
        })
      }
    }
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})
router.get('/welcome/:info', (req, res) => {
  const { info } = req.params
  return res.render('welcome', {
    info,
    cssPath: 'welcome',
    user: res.locals.user,
  })
})
router.get('/clerk', loginGuard, async (req, res) => {
  return res.render('clerk', {
    cssPath: 'clerk',
    user: res.locals.user,
  })
})
router.get('/customer', loginGuard, async (req, res) => {
  return res.render('customer', {
    cssPath: 'customer',
    user: res.locals.user,
  })
})
router.get('/logout', async (req, res, next) => {
  req.session.user = null
  req.session.role = null
  return res.redirect('/')
})
module.exports = router
