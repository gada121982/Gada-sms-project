module.exports = (categoryName, filterString) => {
  let nameCondition = categoryName.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  return nameCondition === true ? true : false
}


