
const BASE_URL = 'http://localhost:8000/'

module.exports.UserConfig = {
  AddUserUrl: BASE_URL + 'admin/user/add',
  GetAllUserUrl: BASE_URL + 'admin/user/all',
  EditUserUrl: BASE_URL + 'admin/user/edit',
  DeleteUserUrl: BASE_URL + 'admin/user/delete',
}

module.exports.CategoryConfig = {
  AddCategoryUrl: BASE_URL + 'admin/category/add',
  GetAllCategoryUrl: BASE_URL + 'admin/category/getall',
  DeleteCategoryUrl: BASE_URL + 'admi/category/delete',
}

module.exports.TemplateConfig = {
  GetAllTemplateUrl: BASE_URL + 'admin/template/all',
  AddTemplateUrl: BASE_URL + 'admin/template/add',
  DeleteTemplateUrl: BASE_URL + 'admin/template/delete',
  UpdateTemplateUrl: BASE_URL + 'admin/template/update',
}

module.exports.HistoryConfig = {
  getAllHistory: BASE_URL + 'admin/history'
}

module.exports.UserSfConfig = {
  getAllUserSf: BASE_URL + 'admin/usersf/all'
}

module.exports.AuthConfig = {
  sendLogout: BASE_URL + 'auth/admin/logout'
}

module.exports.redirectToLoginPage = BASE_URL + 'auth/login'
