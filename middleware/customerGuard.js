module.exports = async (req, res, next) => {
  if (req.session.user && req.session.role === 'customer') {
    next()
  } else {
    return res.redirect('/login')
  }
}
