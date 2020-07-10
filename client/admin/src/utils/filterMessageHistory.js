module.exports = (history, filterString) => {
  let userId = history.user_id.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  let phoneNumber = history.customer_phone.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  let status = history.status.toString().toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  let customerName = history.customer_name.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  let content = history.content.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  return userId === true ||
    phoneNumber === true ||
    customerName === true ||
    status === true ||
    content === true ||
    phoneNumber === true ? true : false
}
