module.exports = (user, filterString) => {
  let username = user.username.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  let password = user.password.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  let updateAt = user.updatedAt.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())

  return username === true ||
    password === true ||
    updateAt === true ? true : false
}
