/**
 * @param {String} data
 */
module.exports.checkLength = (data) => {
  if (data.length > 40) {
    return {
      status: false,
      message: ['Tên thể loại quá dài, xin nhập lại']
    }
  }
  if (data.length < 2) {
    return {
      status: false,
      message: ['Tên thể loại quá ngắn, xin nhập lại']
    }
  }
  return {
    status: true
  }
}

/**
 * @param {String} templateContent
 */
module.exports.checkTemplateContent = (templateContent) => {
  if (templateContent.length > 300) {
    return {
      status: false,
      message: ['Mẫu tin quá dài']
    }
  }
  if (templateContent.length < 40) {
    return {
      status: false,
      message: ['Mẫu tin quá ngắn']
    }
  }
  return {
    status: true
  }
}
