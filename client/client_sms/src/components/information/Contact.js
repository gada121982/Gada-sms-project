
import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import * as contactAction from '../../actions/contactAction'
import * as stepAction from '../../actions/stepAction'
import { connect } from 'react-redux'
import Icon from '../icons/index'
import './Contact.css'

class Contact extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      customerName: this.props.contact.customerName,
      phoneNumber: this.props.contact.phoneNumber,
      goNextStep: false
    }
  }

  onChange = event => {
    let customerName = event.target.name
    let value = event.target.value
    this.setState({
      [customerName]: value
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      customerName: nextProps.contact.customerName,
      phoneNumber: nextProps.contact.phoneNumber
    })
  }

  onSubmit = event => {
    event.preventDefault()
  }

  onNextStep = () => {
    this.props.switchStep(2)

    this.setState({
      goNextStep: true
    })
    let dataUser = {
      customerName: this.state.customerName,
      phoneNumber: this.state.phoneNumber
    }
    this.props.commitContact(dataUser)
  }

  render() {
    let name = this.state.customerName
    let phone = this.state.phoneNumber
    if (this.state.goNextStep) {
      return <Redirect to='/template' />
    }

    return (
      <div className='contact'>
        <form action='/' method='post' onSubmit={this.onSubmit}>

          <div className='customer-name-wraper'>
            <label> Tên người nhận</label>
            <div className='input-wraper'>
              <Icon name='people' />
              <input
                value={name}
                onChange={this.onChange}
                type='text'
                name="customerName">
              </input>
            </div>
          </div>

          <div className='phone-number-wraper'>
            <label> Số  điện thoại</label>
            <div className='input-wraper'>
              <Icon name='phone' />
              <input
                value={phone}
                onChange={this.onChange}
                type='number'
                name="phoneNumber">
              </input>
            </div>
          </div>


          <input onClick={this.onNextStep} type='submit' value='Xác nhận'></input>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    contact: state.contactReducer,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    commitContact: contact => {
      dispatch(contactAction.submitContact(contact))
    },
    switchStep: stepActive => {
      dispatch(stepAction.switchStep(stepActive))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)