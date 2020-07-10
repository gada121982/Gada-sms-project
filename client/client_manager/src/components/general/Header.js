import React, { PureComponent } from 'react'
import Axios from 'axios'
import { authConfig, redirectToMessage, redirectToLoginPage } from '../../config'
import ClassNames from 'classnames'
import Icon from '../icons/index'
import Logo from '../../assets/images/logo.png'
import './Header.css'


class Header extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      isHideDropMenu: true,
      username: ''
    }
  }

  componentDidMount() {
    let username = localStorage.getItem('username')
    if (username) {
      this.setState({
        username
      })
    }
  }

  onToggleDropMenu = () => {
    this.setState({
      isHideDropMenu: !this.state.isHideDropMenu
    })
  }

  onLogout = async () => {
    let { data } = await Axios.post(authConfig.sendLogout)

    if (data.status) {
      window.location = redirectToLoginPage
    }
  }

  render() {
    return (
      <header>
        <div>
          <img src={Logo} alt='logo' />
          <div className='dropdown-avt' onClick={this.onToggleDropMenu}>
            <div>
              <span>{this.state.username[0]}</span>
            </div>
            <div>
              <span>{this.state.username}</span>
              <Icon name='dropdown' />
            </div>
            <ul className={ClassNames({
              'drop-menu-header': true,
              'hide': this.state.isHideDropMenu === true
            })}>
              <li onClick={this.onLogout}>Log out</li>
              <li>
                <a rel='noopener noreferrer' href={redirectToMessage.redirectToMessagePage} target='_blank'>Send message</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
