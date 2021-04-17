const express = require('express')
const router = express.Router()
const MealKits = require('../model/mealkits')
router.get('/:_id', async (req, res) => {
  const { _id } = req.params
  const detailInfo = await MealKits.findById(_id).lean()
  return res.render('detail', {
    detailInfo,
    user: res.locals.user,
  })
})

router.get('/addToCart/:_id', async (req, res) => {
  const { _id } = req.params
  if (!req.session.user) {
    return res.redirect('/login')
  } else {
    if (!req.session.role === 'customer') {
      return res.redirect('/')
    }
    if (!req.session.cart) {
      req.session.cart = {}
    }
    if (req.session.cart[_id]) {
      req.session.cart[_id]++
    } else {
      req.session.cart[_id] = 1
    }
  }
  return res.redirect('/customer')
})

module.exports = router
