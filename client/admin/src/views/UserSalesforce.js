import React, { PureComponent } from 'react';
import Icon from '../components/icons/index'
import Util from '../utils/index'
import './UserSalesforce.css'
import Axios from 'axios';
import { UserSfConfig } from '../config'

class UserSalesforce extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      userSfData: [],
      searchText: ''
    }
  }

  async componentDidMount() {
    let { data } = await Axios.get(UserSfConfig.getAllUserSf)

    if (data.status) {
      this.setState({
        userSfData: data.message
      })
    }
  }

  onSearchChange = event => {
    this.setState({
      searchText: event.target.value
    })
  }

  render() {
    return (
      <div className='user-salesforce'>
        <div className='user-salesforce-header'>
          <div className='search-bar-user-salesforce'>
            <Icon name='search' />
            <input onChange={this.onSearchChange} placeholder='Search user salesforce' />
          </div>
          <h3>User Salesforce</h3>
        </div>
        <table className='user-salesforce-list'>
          <thead>
            <tr>
              <th>STT</th>
              <th>User id</th>
              <th>Instance url</th>
              <th>Access token</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.userSfData.map((data, index) => {
                if (Util.isMatchUserSalesforce(data, this.state.searchText)) {
                  return (
                    <tr key={index} >
                      <td>{index + 1}</td>
                      <td>{data.user_id}</td>
                      <td>{data.instance_url}</td>
                      <td>
                        {data.access_token}

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
}

export default UserSalesforce;
