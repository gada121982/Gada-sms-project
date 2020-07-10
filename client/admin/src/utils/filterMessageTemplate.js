module.exports = (template, filterString) => {
  let content = template.content.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  let categoryName = template.category.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  let updateAt = template.updatedAt.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())

  return categoryName === true ||
    content === true ||
    updateAt === true ? true : false
}
