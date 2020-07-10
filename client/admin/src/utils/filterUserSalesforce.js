module.exports = (usersf, filterString) => {
  let userid = usersf.user_id.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  let instance_url = usersf.instance_url.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  let access_token = usersf.access_token.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())

  return userid === true ||
    instance_url === true ||
    access_token === true ? true : false
}
