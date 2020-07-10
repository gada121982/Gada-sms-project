const TemplateModel = require('../../../models/MessageTemplate')
const CategoryModel = require('../../../models/MessageCategory')

module.exports.getAllTemplate = (req, res) => {
  TemplateModel.find().exec((error, data) => {
    if (error) {
      res.send({
        status: false,
        error: 'Lấy dữ liệu không thành công'
      })
    }
    res.send({
      status: true,
      payload: data
    })
  })
}

module.exports.getTemplateByCategoryName = async (req, res) => {
  const { categoryName } = req.body

  const isExistCategory = await CategoryModel.countDocuments({ name: categoryName })
  if (isExistCategory === 0) {
    res.send({
      status: false,
      error: 'Thể loại không tồn tại'
    })
    return
  }

  TemplateModel.find({ category: categoryName }).exec((error, data) => {
    if (error) {
      res.send({
        status: false,
        error: 'Lấy dữ liệu không thành công'
      })
    }

    res.send({
      status: true,
      message: data
    })
  })
}
