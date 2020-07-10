const TemplateModel = require('../../../models/MessageTemplate')
const CategoryModel = require('../../../models/MessageCategory')

const validateInput = require('../utils/validateInput')

module.exports.addTemplate = async (req, res) => {
  const data = req.body
  const isValid = validateInput.checkTemplateContent(data.content)

  if (!isValid.status) {
    res.send(isValid)
    return
  }

  // check exist category
  const isExistCategory = await CategoryModel.countDocuments({ name: data.category })
  if (isExistCategory === 0) {
    res.send({
      status: false,
      message: ['Thể loại không tồn tại']
    })
    return
  }

  // check exist template
  TemplateModel.countDocuments({ content: data.content }).exec((error, count) => {
    if (error) {
      throw new Error(error)
    }
    if (count > 0) {
      res.send({
        status: false,
        message: ['Nội dung mẫu tin đã tồn tại']
      })
    } else {
      const templateSave = new TemplateModel(data)
      templateSave.save((error, template) => {
        if (error) {
          res.send({
            status: false,
            message: ['Thêm mẫu tin không thành công']
          })
          return
        }
        res.send({
          newTemplate: template,
          status: true,
          message: ['Thêm mẫu tin thành công']
        })
      })
    }
  })
}

module.exports.patchTemplate = async (req, res) => {
  const {
    _id: idTemplate,
    data
  } = req.body

  // check exist category
  const isExistCategory = await CategoryModel.countDocuments({ name: data.category })
  if (isExistCategory === 0) {
    res.send({
      status: false,
      message: ['Thể loại không tồn tại']
    })
    return
  }

  try {
    const result = await TemplateModel.findByIdAndUpdate(idTemplate, data)

    result.category = data.category
    result.content = data.content

    res.send({
      newTemplate: result,
      status: true,
      message: ['Update template succesful']
    })
  } catch (e) {
    res.send({
      status: false,
      message: ['our fault, update fail']
    })
  }
}

module.exports.delTemplate = (req, res) => {
  const { _id: idTemplate } = req.body

  TemplateModel.deleteOne({ _id: idTemplate }, (error, result) => {
    if (error) {
      res.send({
        status: false
      })
    }

    if (result.n === 0) {
      res.send({
        status: false
      })
    } else {
      res.send({
        status: true
      })
    }
  })
}

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
