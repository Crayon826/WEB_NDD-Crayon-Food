const products = [
  {
    Title: 'Congee & Fried Dough Stick',
    Included: 'Porridge and fries',
    Description:
      'Congee and Fried Dough Stick is a classic Chinese breakfast dish.',
    Price: '$1.99',
    Category: 'Breakfast',
    Time: '10 Minutes',
    Servings: 1,
    Calories: 1000,
    TopMeal: true,
    ImageUrl: '/images/1.png',
  },

  {
    Title: 'Spring rolls',
    Included: 'Fried food made with a thin wrapper and wrapped in a filling',
    Description:
      'With fresh vegetables wrapped in rice paper, these China spring rolls are a refreshing appetizer for an Asian-inspired meal.',
    Price: '$2.99',
    Category: 'Breakfast',
    Time: '10 Minutes',
    Servings: 2,
    Calories: 153,
    topMeal: false,
    ImageUrl: '/images/12.png',
  },

  {
    Title: 'Minced Pork Congee with Preserved Egg',
    Included: 'Pork, porridge and preserved eggs',
    Description: 'A perfect breakfast',
    Price: '$5.99',
    Category: 'Breakfast',
    Time: '10 Minutes',
    Servings: 1,
    Calories: 1400,
    topMeal: false,
    ImageUrl: '/images/13.png',
  },

  {
    Title: 'Steamed vermicelli roll',
    Included: 'Flour and mince',
    Description: 'A perfect breakfast.',
    Price: '$1.99',
    Category: 'Breakfast',
    Time: '10 Minutes',
    Servings: 4,
    Calories: 648,
    topMeal: false,
    ImageUrl: '/images/14.png',
  },

  {
    Title: 'Potato powder',
    Included: 'Vermicelli and potatoes',
    Description: 'A perfect lunch',
    Price: '$10.99',
    Category: 'Lunch',
    Time: '10 Minutes',
    Servings: 1,
    Calories: 1650,
    topMeal: true,
    ImageUrl: '/images/21.png',
  },

  {
    Title: 'Meat clip buns',
    Included: 'Bread and meat',
    Description: 'A perfect lunch',
    Price: '$6.99',
    Category: 'Lunch',
    Time: '10 Minutes',
    Servings: 1,
    Calories: 600,
    topMeal: false,
    ImageUrl: '/images/22.png',
  },

  {
    Title: 'Delicious eggplant',
    Included: 'Eggplant',
    Description: 'A perfect lunch',
    Price: '$12.99',
    Category: 'Lunch',
    Time: '10 Minutes',
    Servings: 1,
    Calories: 985,
    topMeal: false,
    ImageUrl: '/images/23.png',
  },

  {
    Title: 'Beef powder',
    Included: 'Beef and powder',
    Description: 'A perfect lunch',
    Price: '$10.99',
    Category: 'Lunch',
    Time: '10 Minutes',
    Servings: 1,
    Calories: 1400,
    topMeal: false,
    ImageUrl: '/images/24.png',
  },

  {
    Title: 'Signature dish',
    Included: 'Delicious',
    Description: 'A perfect dinner.',
    Price: '$32.99',
    Category: 'Dinner',
    Time: '10 Minutes',
    Servings: 1,
    Calories: 2400,
    topMeal: true,
    ImageUrl: '/images/31.png',
  },

  {
    Title: 'Beef potato flour',
    Included: 'Beef and potato flour',
    Description: 'A perfect dinner.',
    Price: '$1.99',
    Category: 'Dinner',
    Time: '10 Minutes',
    Servings: 1,
    Calories: 1200,
    topMeal: true,
    ImageUrl: '/images/32.png',
  },

  {
    Title: 'Grilled fish',
    Included: 'Fish',
    Description: 'A perfect dinner.',
    Price: '$2.99',
    Category: 'Dinner',
    Time: '10 Minutes',
    Servings: 1,
    Calories: 1600,
    topMeal: false,
    ImageUrl: '/images/33.png',
  },

  {
    Title: 'Stir-fry beef',
    Included: 'Beef',
    Description: 'A perfect dinner.',
    Price: '$9.99',
    Category: 'Dinner',
    Time: '10 Minutes',
    Servings: 1,
    Calories: 1500,
    topMeal: false,
    ImageUrl: '/images/34.png',
  },
]
function getMeals(cate) {
  return products.filter((item) => item.Category === cate)
}
function getTopMeals() {
  return products.filter((item) => item.topMeal)
}

module.exports = {
  getMeals,
  getTopMeals,
}
