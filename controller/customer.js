const express = require('express')
const router = express.Router()
const sgMail = require('@sendgrid/mail')
const MealKits = require('../model/mealkits')
router.get('/', async (req, res) => {
  return res.redirect('/customer/shopping_cart')
})
router.get('/shopping_cart', async (req, res) => {
  return res.render('shopping_cart', {
    user: res.locals.user,
  })
})

module.exports = router
