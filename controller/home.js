const express = require('express')
const router = express.Router()
const MealKits = require('../model/mealkits')

router.get('/', async (req, res, next) => {
  const topMeals = await MealKits.find({ TopMeal: true }).lean()
  return res.render('index', {
    topMeals,
    user: res.locals.user,
  })
})

router.get('/personalCenter', (req, res) => {
  const { role } = req.session
  if (!role) {
    return res.redirect('/login')
  } else {
    return res.redirect(`/${role}`)
  }
})

module.exports = router
