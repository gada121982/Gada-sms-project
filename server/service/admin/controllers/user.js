const User = require('../../../models/User')
const bcrypt = require('bcrypt')

module.exports.add = async (req, res) => {
  const { username, password } = req.body
  const message = []

  // check valid username, password require ( too long , too short)
  if (username.length > 50) {
    message.push('Username too long')
  }
  if (username.length < 5) {
    message.push('Username too short')
  }
  if (password.length < 8) {
    message.push('Password must have at least 8 charactor')
  }
  if (password.length > 100) {
    message.push('Password too long')
  }

  // check exist username
  const checkExistUser = await User.find({ username })

  if (checkExistUser.length > 0) {
    message.push('Username is not available')
  }

  if (message.length > 0) {
    res.send({
      status: false,
      message
    })
    return
  }

  const hashpassword = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    password: hashpassword,
    role: false
  })

  user.save((error, newUser) => {
    if (error) {
      res.send({
        status: false,
        message: ['Our fault, an error occurred']
      })
      throw new Error(error)
    }

    res.send({
      newUser,
      status: true,
      message: ['Account created successfully']
    })
  })
}

module.exports.getAll = async (req, res) => {
  try {
    const users = await User.find({ role: false })
    res.send({
      status: true,
      payload: users
    })
  } catch (e) {
    res.send({
      status: false,
      message: 'Load user data unsuccess'
    })
    throw new Error(e)
  }
}

module.exports.delete = async (req, res) => {
  await User.findByIdAndDelete(req.body._id)
  res.status(200).send('ok')
}

module.exports.edit = async (req, res) => {
  const { _id, password } = req.body
  const message = []

  if (password.length < 8) {
    message.push('Password must have at least 8 charactor')
  }
  if (password.length > 100) {
    message.push('Password too long')
  }

  // check exist username
  const checkPasswordNotChange = await User.findById(_id)

  const isChange = await bcrypt.compare(password, checkPasswordNotChange.password)

  if (isChange) {
    message.push('Oops! Your new password same as old password')
  }

  if (message.length > 0) {
    res.send({
      status: false,
      message
    })
    return
  }

  const hashpassword = await bcrypt.hash(password, 10)

  try {
    const userUpdated = await User.findByIdAndUpdate(_id, { password: hashpassword })
    if (userUpdated) {
      res.send({
        userUpdated,
        status: true,
        message: ['Account updated successfully']
      })
    }
  } catch (e) {
    res.send({
      status: false,
      message: ['Our fault, an error occurred']
    })
    console.log('error', e)
  }
}
