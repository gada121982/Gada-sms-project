import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Icon from '../icons/index'
import './Conversation.css'

class Conversation extends PureComponent {

  render() {
    const transactions = this.props.transactions.reverse()
    const contact = this.props.contact
    return (
      <div className='conversation'>
        {
          transactions.map((transaction, index) => {
            if (transaction.status) {
              return (
                <div className='transaction success' key={index}>
                  <div >
                    <div>
                      <div className='avatar'>
                        <span>{contact.customer_name[0]}</span>
                      </div>
                      <div className='transaction-status'>
                        <span className='status-note'><span>Bạn</span>gửi tin nhắn thành công tới <span> {contact.customer_name}</span></span>
                        <span className='transaction-time'>{transaction.updatedAt}</span>
                      </div>
                    </div>
                    <Icon name='success' />
                  </div>
                  <div className='transaction-content'>
                    <span>
                      {transaction.content}
                    </span>
                  </div>
                </div>
              )
            }
            return (
              <div className='transaction fail' key={index}>
                <div >
                  <div>
                    <div className='avatar'>
                      <span>H</span>
                    </div>
                    <div className='transaction-status'>
                      <span className='status-note'><span>Bạn</span>gửi tin nhắn thất bại tới <span> {contact.customer_name}</span></span>
                      <span className='transaction-time'>{transaction.updatedAt}</span>
                    </div>
                  </div>
                  <div className='transaction-icon'>
                    <Icon className='send-button' name='send' />
                    <Icon name='fail' />
                  </div>
                </div>

                <div className='transaction-content'>
                  <span>
                    {transaction.content}
                  </span>
                </div>
              </div>
            )
          })
        }
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transactionReducer,
    contact: state.contactReducer
  }
}

export default connect(mapStateToProps, null)(Conversation);
