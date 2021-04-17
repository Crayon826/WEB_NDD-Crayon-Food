const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const path = require('path')

const MealKits = require('../model/mealkits')

router.get('/', async (req, res) => {
  return res.redirect('/clerk/viewMeals')
})
router.get('/viewMeals', async (req, res) => {
  const allMealKits = await MealKits.find().lean()
  return res.render('mealKits', {
    allMealKits,
    user: res.locals.user,
  })
})
router.get('/edit/:_id', async (req, res) => {
  const { _id } = req.params
  const mealData = await MealKits.findById(_id).lean()
  return res.render('editMeals', {
    mealData,
    user: res.locals.user,
  })
})
router.post('/editMeal', async (req, res) => {
  try {
    const form = new formidable.IncomingForm()
    form.uploadDir = path.join(__dirname, '../public', 'uploads')
    form.keepExtensions = true
    form.parse(req, async (error, fields, files) => {
      const { _id } = fields
      const ImagePath = files.Image.path.split('public')[1]
      fields.Image = ImagePath
      await MealKits.updateOne({ _id }, { $set: fields })
    })
    return res.redirect('/clerk/viewMeals')
  } catch (error) {
    console.log(error)
    return res.send(error)
  }
})
router.get('/createMeal', async (req, res) => {
  return res.render('createMeals', {
    user: res.locals.user,
  })
})
router.post('/createMeal', async (req, res) => {
  try {
    const form = new formidable.IncomingForm()
    form.uploadDir = path.join(__dirname, '../public', 'uploads')
    form.keepExtensions = true
    form.parse(req, async (error, fields, files) => {
      const oldFilePath = files.Image.path
      const Image = oldFilePath.split('public')[1]
      fields.Image = Image
      await MealKits.create(fields)
    })
    return res.redirect('/clerk/viewMeals')
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

module.exports = router
