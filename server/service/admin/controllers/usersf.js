const UserSfModel = require('../../../models/UserSF')

module.exports.getAll = async (req, res) => {
  try {
    const data = await UserSfModel.find()
    res.send({
      status: true,
      message: data
    })
    return
  } catch (e) {
    res.send({
      status: false
    })
  }
}
