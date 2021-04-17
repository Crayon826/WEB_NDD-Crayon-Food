const mongoose = require('mongoose')

const mealkitsSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Included: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Cooking_Time: {
    type: Number,
    required: true,
  },
  Servings: {
    type: Number,
    required: true,
  },
  Calories: {
    type: Number,
    required: true,
  },
  TopMeal: {
    type: Boolean,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('MealKit', mealkitsSchema)
