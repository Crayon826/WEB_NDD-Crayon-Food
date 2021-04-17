const express = require('express')
const router = express.Router()
const MealKits = require('../model/mealkits')

router.get('/', async (req, res) => {
  const data = await MealKits.find().lean()
  const topMeals = await MealKits.find({ TopMeal: true }).lean()
  const menu = data.reduce((acc, cur) => {
    const category = cur.Category
    if (acc[category]) {
      acc[category].push(cur)
    } else {
      acc[category] = []
      acc[category].push(cur)
    }
    return acc
  }, {})
  return res.render('menu', {
    topMeals,
    menu,
    user: res.locals.user,
  })
})

module.exports = router
