module.exports = (contact, filterString) => {
  let nameCondition = contact.customer_name.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  let phoneCondition = contact.customer_phone.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  return nameCondition === true || phoneCondition === true ? true : false
}
