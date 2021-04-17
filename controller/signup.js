const express = require('express')
const router = express.Router()
const sgMail = require('@sendgrid/mail')
const bcrypt = require('bcrypt')
const User = require('../model/user')

router.get('/', (req, res) => {
  return res.render('signup', {
    user: res.locals.user,
  })
})
router.post('/', async (req, res) => {
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
      })
    } else {
      const salt = bcrypt.genSaltSync(10)
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
  } catch (error) {
    console.log(error)
    return res.send(error)
  }
})

module.exports = router
