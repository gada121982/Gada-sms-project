import React, { PureComponent } from 'react'
import { UserConfig } from '../config'
import Icon from '../components/icons/index'
import Util from '../utils/index'
import Axios from 'axios'
import './UserNormal.css'


class UserNormal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataUser: [],
      respondAdd: {
        isHide: true,
        status: null,
        message: ''
      },
      respondEdit: {
        isHide: true,
        status: null,
        message: ''
      },
      searchText: '',
      userNormalToAdd: {},
      userNormalToEdit: {},
      isEditUserNormal: false,
      isAddUserNormal: false
    }
  }

  async componentDidMount() {
    const { data } = await Axios.get(UserConfig.GetAllUserUrl)
    if (data.status) {
      this.setState({
        dataUser: data.payload
      })
    }
  }

  onSearchChange = event => {
    this.setState({
      searchText: event.target.value
    })
  }

  switchToAddUserNormalPage = () => {
    this.setState({
      isAddUserNormal: true
    })
  }

  switchToListUserNormalPage = () => {
    this.setState({
      respondAdd: {
        isHide: true,
        status: null,
        message: ''
      },
      respondEdit: {
        isHide: true,
        status: null,
        message: ''
      },
      isEditUserNormal: false,
      isAddUserNormal: false
    })
  }

  onDelete = async (_id, username) => {
    let reply = window.confirm(`do you want to delete account ${username}?`)
    if (reply) {
      await Axios.post(UserConfig.DeleteUserUrl, { _id })

      let newDataUser = this.state.dataUser.filter((user) => {
        return user._id !== _id
      })

      this.setState({
        dataUser: newDataUser
      })
    }
  }

  onEdit = userId => {
    // find template by template id
    let userNormal = this.state.dataUser.filter((value) => {
      return value._id === userId
    })

    let { _id } = userNormal[0]
    // set state with template above    
    this.setState({
      userNormalToEdit: {
        _id
      },
      isEditUserNormal: true,
      isAddUserNormal: false
    })
  }

  onEditPassword = event => {
    let newUserNormalToEdit = { ...this.state.userNormalToEdit }
    newUserNormalToEdit.password = event.target.value

    this.setState({
      userNormalToEdit: newUserNormalToEdit
    })
  }

  onEditUserNormal = async event => {
    event.preventDefault()
    const { _id, password } = this.state.userNormalToEdit
    let newDataUser = [...this.state.dataUser]

    if (_id && password) {
      let { data } = await Axios.post(UserConfig.EditUserUrl, {
        _id,
        password
      })

      // update new dataUser
      if (data.userUpdated) {
        this.state.dataUser.forEach((user, index) => {
          if (user._id === _id) {
            let newUser = { ...user }
            newUser.password = data.userUpdated.password
            newDataUser[index] = newUser
            return
          }
        })
      }

      this.setState({
        dataUser: newDataUser,
        respondEdit: {
          isHide: false,
          status: data.status,
          message: data.message
        }
      })
      return
    }
    this.setState({
      respondEdit: {
        isHide: false,
        status: false,
        message: ['Password must have value']
      }
    })

  }

  onAddUsername = event => {
    let newUserNormalToAdd = { ...this.state.userNormalToAdd }
    newUserNormalToAdd.username = event.target.value

    this.setState({
      userNormalToAdd: newUserNormalToAdd
    })
  }

  onAddPassword = event => {
    let newUserNormalToAdd = { ...this.state.userNormalToAdd }
    newUserNormalToAdd.password = event.target.value

    this.setState({
      userNormalToAdd: newUserNormalToAdd
    })
  }

  onAddUserNormal = async event => {
    event.preventDefault()
    const { username, password } = this.state.userNormalToAdd
    if (username && password) {
      let { data } = await Axios.post(UserConfig.AddUserUrl, {
        username,
        password
      })

      this.setState({
        dataUser: data.newUser === undefined ? this.state.dataUser : [...this.state.dataUser, data.newUser],
        respondAdd: {
          isHide: false,
          status: data.status,
          message: data.message
        }
      })
      return
    }
    this.setState({
      respondAdd: {
        isHide: false,
        status: false,
        message: ['Input must have value']
      }
    })

  }

  render() {
    if (!this.state.isEditUserNormal && !this.state.isAddUserNormal) {
      return (
        <div className='user-normal'>
          <div className='user-normal-header'>
            <div className='search-bar-user-normal'>
              <Icon name='search' />
              <input onChange={this.onSearchChange} placeholder='Search user normal' />
            </div>
            <div className='search-bar-user-normal-right'>
              <div className='add-user-normal' onClick={this.switchToAddUserNormalPage}>
                <span>Add</span>
              </div>
              <h3>User normal</h3>
            </div>
          </div>
          <table className='user-normal-list'>
            <thead>
              <tr>
                <th>STT</th>
                <th>Username</th>
                <th>Password hash</th>
                <th>Update at</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.dataUser.map((data, index) => {
                  if (Util.isMatchUserNormal(data, this.state.searchText)) {
                    return (
                      <tr key={index} >
                        <td>{index + 1}</td>
                        <td>{data.username}</td>
                        <td>{data.password}</td>
                        <td>{data.updatedAt}</td>
                        <td>
                          <div
                            className='delete-user-normal'
                            onClick={() => this.onDelete(data._id, data.username)}>
                            <Icon name='delete' />
                            <span>Delete</span>
                          </div>
                          <div
                            className='edit-user-normal'
                            onClick={() => this.onEdit(data._id)}>
                            <Icon name='edit' />
                            <span>Edit</span>
                          </div>
                        </td>
                      </tr>
                    )
                  }
                  return null
                })
              }
            </tbody>
          </table>
        </div>
      )
    }
    if (this.state.isEditUserNormal) {
      return (
        <div className='edit-user-normal-page'>
          <div className='edit-user-normal-heading'>
            <span>Edit</span>
            <h2>User normal</h2>
            <div className='return-to-user-normal-list-page' onClick={this.switchToListUserNormalPage}></div>
          </div>
          {
            this.state.respondEdit.isHide === false && this.state.respondEdit.status === true &&
            <div className='respond-message-success'>
              {
                this.state.respondEdit.message.map((payload, index) => {
                  return <span key={index}>{payload}</span>
                })
              }
            </div>
          }
          {
            this.state.respondEdit.isHide === false && this.state.respondEdit.status === false &&
            <div className='respond-message-fail'>
              {
                this.state.respondEdit.message.map((payload, index) => {
                  return <span key={index}>{payload}</span>
                })
              }
            </div>
          }
          <form className='edit-user-normal-form' onSubmit={this.onEditUserNormal}>

            <label htmlFor='password'>Password hash</label>
            <input
              id='password'
              placeholder='Type your plain text password, it will be automatic hash'
              onChange={this.onEditPassword} />
            <input
              type='submit'
              value='Submit' />
          </form>
        </div>
      )
    }
    if (this.state.isAddUserNormal) {
      return (
        <div className='add-user-normal-page'>
          <div className='add-user-normal-heading'>
            <span>Add</span>
            <h2>User normal</h2>
            <div className='return-to-user-normal-list-page' onClick={this.switchToListUserNormalPage}></div>
          </div>
          {
            this.state.respondAdd.isHide === false && this.state.respondAdd.status === true &&
            <div className='respond-message-success'>
              {
                this.state.respondAdd.message.map((payload, index) => {
                  return <span key={index}>{payload}</span>
                })
              }
            </div>
          }
          {
            this.state.respondAdd.isHide === false && this.state.respondAdd.status === false &&
            <div className='respond-message-fail'>
              {
                this.state.respondAdd.message.map((payload, index) => {
                  return <span key={index}>{payload}</span>
                })
              }
            </div>
          }
          <form className='add-user-normal-form' onSubmit={this.onAddUserNormal}>
            <label htmlFor='username'>Username</label>
            <input
              id="username"
              onChange={this.onAddUsername} />

            <label htmlFor='password'>Password</label>
            <input
              id='password'
              placeholder='Type your plain text password'
              onChange={this.onAddPassword} />
            <input
              type='submit'
              value='Submit' />
          </form>
        </div>
      )
    }
  }
}

export default UserNormal;
