module.exports = (data, filterString) => {
  let nameCondition = data.customerName.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  let phoneCondition = data.phoneNumber.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  return nameCondition === true || phoneCondition === true ? true : false
}


