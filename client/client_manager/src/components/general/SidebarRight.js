import React, { PureComponent } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Proxy } from '../../config'
import Icon from '../icons/index'
import './SidebarRight.css'


class SidebarRight extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      contentMessage: '',
      respondSend: {
        isHide: true,
        status: null,
        message: []
      },
    }
  }

  sendMessage = async event => {
    event.preventDefault()

    if (this.props.contact.customer_name && this.props.contact.customer_phone && this.state.contentMessage) {
      const { data } = await Axios.post(Proxy.send, {
        customerName: this.props.contact.customer_name,
        customerPhone: this.props.contact.customer_phone,
        content: this.state.contentMessage
      })

      this.setState({
        respondSend: {
          isHide: false,
          status: data.status,
          message: data.message
        }
      })
      return
    }

    this.setState({
      respondSend: {
        isHide: false,
        status: false,
        message: ['Input must have value']
      }
    })
  }

  onChangeInput = event => {
    let contentMessage = event.target.value
    if (contentMessage) {
      this.setState({ contentMessage })
    }
  }

  render() {

    const contact = this.props.contact

    return (
      <div className='sidebar-right-fix'>
        <div className='sidebar-right'>
          <div className='manual-send-message'>
            <span>Gửi tin nhắn</span>
            <div>
              <div className='contact-name-right'>
                <Icon name='people' />
                <span>{contact.customer_name}</span>
              </div>
              <div className='contact-phone-right'>
                <Icon name='phone' />
                <span>{contact.customer_phone}</span>
              </div>
            </div>
            <form onSubmit={this.sendMessage}>
              <textarea onChange={this.onChangeInput}>
              </textarea>
              <input type='submit' value='Send message' />
            </form>
            {
              this.state.respondSend.isHide === false && this.state.respondSend.status === true &&
              <div className='respond-message-success'>
                {
                  this.state.respondSend.message.map((payload, index) => {
                    return <span key={index}>{payload}</span>
                  })
                }
              </div>
            }
            {
              this.state.respondSend.isHide === false && this.state.respondSend.status === false &&
              <div className='respond-message-fail'>
                {
                  this.state.respondSend.message.map((payload, index) => {
                    return <span key={index}>{payload}</span>
                  })
                }
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    contact: state.contactReducer
  }
}

export default connect(mapStateToProps, null)(SidebarRight);
