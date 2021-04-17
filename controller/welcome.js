const express = require('express')

const router = express.Router()

router.get('/:info', async (req, res) => {
  const { info } = req.params
  return res.render('welcome', { info, user: res.locals.user })
})

module.exports = router
