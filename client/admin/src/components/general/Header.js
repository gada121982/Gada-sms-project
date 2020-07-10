import React, { PureComponent } from 'react'
import ClassNames from 'classnames'
import Icon from '../icons/index'
import Logo from '../../assets/images/logo.png'
import Axios from 'axios'
import { AuthConfig, redirectToLoginPage } from '../../config'

import './Header.css'

class Header extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      isHideDropMenu: true
    }
  }

  componentDidMount() {
    let username = localStorage.getItem('username')
    this.setState({ username })
  }

  onToggleDropMenu = () => {
    this.setState({
      isHideDropMenu: !this.state.isHideDropMenu
    })
  }

  sendLogout = async () => {
    let { data } = await Axios.post(AuthConfig.sendLogout)

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
              <li onClick={this.sendLogout}>Log out</li>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
