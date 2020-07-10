import React, { PureComponent } from 'react'
import Axios from 'axios'
import { Conversation } from '../../config'
import { connect } from 'react-redux'
import ClassNames from 'classnames'
import * as contactAction from './../../actions/contactAction'
import * as transactionAction from '../../actions/transactionAction'
import Icon from '../icons/index'
import util from '../../utils/index'
import './SidebarLeft.css'


class SidebarLeft extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      contacts: [],
      activeContact: null,
      filterContact: ''
    }
  }

  async componentDidMount() {
    let { data } = await Axios.get(Conversation.getAllContact)

    if (data.status) {
      this.setState({
        contacts: data.message
      })
    }
  }

  onActiveContact = (contact, index) => {
    this.setState({
      activeContact: index
    })
    this.props.selectContact({
      customer_name: contact.customer_name,
      customer_phone: contact.customer_phone
    })
    this.props.switchTransactionsToDisplay(contact.transactions)
  }

  onSearch = event => {
    this.setState({
      filterContact: event.target.value
    })
  }

  render() {
    return (
      <div className='sidebar-left-fix'>
        <div className='sidebar-left'>
          <div className='search-box'>
            <div>
              <Icon name='search' />
              <input
                onChange={this.onSearch}
                placeholder='Search a contact' />
            </div>
          </div>
          <div className='contact-list'>
            {
              this.state.contacts.map((contact, index) => {
                if (util.isMatchContact(contact, this.state.filterContact) === true) {
                  return (
                    <div
                      className={ClassNames({
                        'contact': true,
                        'active-contact': this.state.activeContact === index
                      })}
                      onClick={() => this.onActiveContact(contact, index)}
                      key={index}>
                      <div>
                        <span>{contact.customer_name[0]}</span>
                      </div>
                      <div>
                        <span>{contact.customer_name}</span>
                        <span>{contact.customer_phone}</span>
                      </div>
                    </div>
                  )
                }
                return null
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectContact: contact => {
      dispatch(contactAction.switchContact(contact))
    },
    switchTransactionsToDisplay: transactions => {
      dispatch(transactionAction.switchTransactions(transactions))
    }
  }
}

export default connect(null, mapDispatchToProps)(SidebarLeft);
