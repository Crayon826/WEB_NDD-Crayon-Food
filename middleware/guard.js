module.exports = async (req, res, next) => {
  if (req.session.user && req.url.split('/')[1] === req.session.role) {
    next()
  } else {
    return res.redirect('/')
  }
}
