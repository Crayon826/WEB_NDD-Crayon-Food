const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    req.session.destroy()
    return res.redirect('/')
  } catch (error) {
    return res.status(500).json({
      msg: 'error',
    })
  }
})

module.exports = router
