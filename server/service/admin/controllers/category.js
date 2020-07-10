const CategoryModel = require('../../../models/MessageCategory')
const templateModel = require('../../../models/MessageTemplate')
const validateInput = require('../utils/validateInput')

module.exports.addCategory = async (req, res) => {
  const category = req.body

  // check length input
  const result = validateInput.checkLength(category.name)

  if (!result.status) {
    res.send(result)
    return
  }

  // check exists record
  CategoryModel.countDocuments({ name: category.name }).exec((error, count) => {
    if (error) {
      throw new Error(error)
    }

    if (count > 0) {
      res.send({
        status: false,
        message: ['Tên thể loại đã tồn tại']
      })
    } else {
      // save to dbs
      const categorySave = new CategoryModel({
        name: category.name
      })

      categorySave.save((error, data) => {
        if (error) {
          res.send({
            status: false,
            message: ['Thêm thể loại không thành công']
          })
        }
        res.send({
          newCategory: data,
          status: true,
          message: ['Thêm thể loại thành công']
        })
      })
    }
  })
}

module.exports.delCategory = async (req, res) => {
  // delete all template belong to this category
  const { _id, categoryName } = req.body
  console.log(categoryName)
  templateModel.deleteMany({ category: categoryName }, (error, result) => {
    if (error) {
      console.log(error)
    }
  })
  const result = await CategoryModel.findByIdAndDelete(_id)
  result ? res.send(true) : res.send(false)
}

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
