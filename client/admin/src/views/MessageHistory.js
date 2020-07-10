import React, { PureComponent } from 'react';
import Icon from '../components/icons/index'
import Util from '../utils/index'
import Axios from 'axios'
import { HistoryConfig } from '../config'
import './MessageHistory.css'

class MessageHistory extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      messageHistory: [],
      searchText: ''
    }
  }

  async componentDidMount() {
    const { data } = await Axios.get(HistoryConfig.getAllHistory)
    if (data.status) {
      this.setState({
        messageHistory: data.message
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
      <div className='message-history'>
        <div className='message-history-header'>
          <div className='search-bar'>
            <Icon name='search' />
            <input onChange={this.onSearchChange} placeholder='Search message history' />
          </div>
          <h3>Message History</h3>
        </div>
        <table className='message-history-list'>
          <thead>
            <tr>
              <th>STT</th>
              <th>User id</th>
              <th>Customer Phone </th>
              <th>Customer name</th>
              <th>Status</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.messageHistory.map((data, index) => {
                if (Util.isMatchHistory(data, this.state.searchText)) {
                  return (
                    <tr key={index} >
                      <td>{index + 1}</td>
                      <td>{data.user_id}</td>
                      <td>{data.customer_phone}</td>
                      <td>{data.customer_name}</td>
                      <td>{data.status.toString()}</td>
                      <td>{data.content}</td>
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

export default MessageHistory;
