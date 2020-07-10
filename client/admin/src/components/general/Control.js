import React, { PureComponent } from 'react';
import Icon from '../icons/index'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import "./Control.css"


class Control extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      isHideMessageList: true,
      isHideUserList: true,
      controlSelected: 1 // 1 history , 2 message , 3 user
    }
  }

  onActiveList = eventName => {
    if (eventName === 'message') {
      this.setState({
        isHideMessageList: !this.state.isHideMessageList
      })
    }
    if (eventName === 'user') {
      this.setState({
        isHideUserList: !this.state.isHideUserList
      })
    }
  }

  render() {
    return (
      <div className='control-wrap-fix'>
        <div className='control'>
          <NavLink to='/admin'>
            <div className='message-history-control'>
              <Icon name='history' />
              <span>Message history</span>
            </div>
          </NavLink>
          <div className='message-template-control' >
            <div onClick={() => this.onActiveList('message')}>
              <Icon name='template' />
              <span>Message</span>
            </div>
            <div className={classNames({
              'message-list': true,
              'hide-list': this.state.isHideMessageList === true
            })}>
              <NavLink exact to='/admin/messagecategory'>
                <span>Category list</span>
              </NavLink>
              <NavLink exact to='/admin/messagetemplate'>
                <span>Template list</span>
              </NavLink>
            </div>
          </div>
          <div className='user-control'>
            <div onClick={() => this.onActiveList('user')}>
              <Icon name='user' />
              <span>User</span>
            </div>
            <div className={classNames({
              'user-list': true,
              'hide-list': this.state.isHideUserList === true
            })}>
              <NavLink exact to='/admin/usernormal'>
                <span>Account normal</span>
              </NavLink>

              <NavLink exact to='/admin/usersalesforce'>
                <span>Account salesforce</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Control;
