const express = require('express')
const router = express.Router()
const MealKits = require('../model/mealkits')
const meal = require('../mealkits')

router.get('/', async (req, res) => {
  try {
    const role = req.session.role
    let message = ''
    if (role !== 'clerk') {
      message = 'You are not authorized to add meal kits'
    } else {
      const counts = await MealKits.find().count()
      if (counts === 0) {
        await MealKits.insertMany(meal)
        message = 'Meal kits added successfully! Please go to the On the Menu page or View meals page'
      } else {
        message = 'Meal kits have already been added to the database'
      }
    }
    return res.render('loadRes', {
      message,
      user: res.locals.user,
    })
  } catch (error) {
    return res.send(error)
  }
})

module.exports = router
