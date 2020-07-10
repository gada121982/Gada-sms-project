const CategoryModel = require('../../../models/MessageCategory')

module.exports.getCategory = (req, res) => {
  CategoryModel.find().exec((error, data) => {
    if (error) {
      res.send({
        status: false,
        message: 'Lấy dữ liệu không thành công'
      })
    }

    res.send({
      status: true,
      message: data
    })
  })
}
