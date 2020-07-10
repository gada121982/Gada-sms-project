module.exports = (category, filterString) => {
  let categoryName = category.name.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  let createAt = category.createdAt.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  let updateAt = category.updatedAt.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  return categoryName === true ||
    createAt === true ||
    updateAt === true ? true : false
}
