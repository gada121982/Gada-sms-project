module.exports.logout = (req, res) => {
  res.clearCookie('admin_token').send({
    status: true
  })
}
