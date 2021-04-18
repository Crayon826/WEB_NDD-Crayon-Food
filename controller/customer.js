const express = require('express')
const router = express.Router()
const sgMail = require('@sendgrid/mail')
const MealKits = require('../model/mealkits')
router.get('/', async (req, res) => {
  return res.redirect('/customer/shopping_cart')
})
router.get('/shopping_cart', async (req, res) => {
  const userCart = req.session.cart || []

  const cartList = Object.keys(userCart)

  let cart = []
  if (cartList) {
    for (const id of cartList) {
      const target = await MealKits.findById(id).lean()
      target.Counts = req.session.cart[id]
      cart.push(target)
    }
  }

  return res.render('shopping_cart', {
    cart,
    user: res.locals.user,
  })
})

router.get('/order', async (req, res) => {
  const { email } = req.session.user
  const cartList = Object.keys(req.session.cart)
  let result = []
  let str = ''
  let sum = 0
  for (const id of cartList) {
    const target = await MealKits.findById(id).lean()
    target.Counts = req.session.cart[id]
    result.push(target)
  }
  for (let i = 0; i < result.length; i++) {
    str += result[i].Counts + " " + result[i].Title + ','
    sum += result[i].Counts
  }
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY)
  await sgMail.send({
    to: email,
    from: 'plin23@myseneca.ca ',
    subject: 'Order completed',
    html: `You have purchased the following food: ${str} There are ${sum} kinds of food.`,
  })
  req.session.cart = null
  return res.redirect('/customer')
})

module.exports = router
