const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../model/user')
router.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/')
  }
  return res.render('login', {
    user: res.locals.user,
  })
})

router.post('/', async (req, res) => {
  try {
    const { email, pwd, role } = req.body
    const user = await User.findOne({
      email,
    })
    if (user && bcrypt.compareSync(pwd, user.pwd)) {
      req.session.user = user
      req.session.role = role
      return res.redirect(`/${role}`)
    } else {
      return res.render('login', {
        user: res.locals.user,
        error: `You entered an invalid email or password`,
      })
    }
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

module.exports = router
