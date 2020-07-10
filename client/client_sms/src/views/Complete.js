import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Axios from 'axios'
import { Proxy } from '../config'
import Icon from '../components/icons/index'
import finishDecoration from '../assets/images/finish.png'
import './Complete.css'

class Complete extends PureComponent {

  constructor(props) {
    super(props)

    this.valid = true
    this.state = {
      isValid: true,
      isComplete: false
    }
  }

  onFinalSubmit = async () => {
    let { phoneNumber, customerName } = this.props.customerInfo
    let finalMessage = this.props.messageDone.lastMessage

    await Axios.post(Proxy.sendMessage, {
      customerName,
      customerPhone: phoneNumber,
      content: finalMessage
    })

    this.setState({
      isComplete: true
    })
  }

  render() {
    let { customerName, phoneNumber } = this.props.customerInfo
    let finalMessage = this.props.messageDone.lastMessage

    // check valid input
    if (customerName === '' || phoneNumber === '') {
      this.valid = false
      customerName = 'Chưa cung cấp'
      phoneNumber = 'Chưa cung cấp'
    }

    if (finalMessage === '') {
      this.valid = false
    }

    return (

      <div className='complete'>
        {
          this.state.isComplete === false &&
          <div className='final-info-wrap'>
            <div className='customer-contact-info'>
              <h4> Thông tin đã nhập </h4>
              <div className='customer-contact-info-content'>
                <div className='final-customer-name'>
                  <Icon name='people' />
                  <span> {customerName} </span>
                </div>
                <div className='final-customer-phone'>
                  <Icon name='phone' />
                  <span> {phoneNumber} </span>
                </div>
              </div>
            </div>
            <div className='final-message'>
              <span> {finalMessage} </span>
            </div>
          </div>
        }

        {
          this.state.isComplete === false &&
          <div className='show-notification'>
            {
              this.valid === true &&
              <div className='notification-message'>
                <span>
                  Bạn đã hoàn thành thủ tục nhập thông tin
                 <br />
                 Vui lòng nhấn xác nhận để  gửi tin
               </span>
                <div onClick={this.onFinalSubmit} className='submit-button-final'>
                  <span> Xác nhận </span>
                </div>
              </div>
            }
            {
              this.valid === false &&
              <div className='notification-message-error'>
                <span >
                  Bạn chưa hoàn thành thủ tục nhập thông tin
                  Vui lòng kiểm tra lại
               </span>
              </div>
            }
            <img src={finishDecoration} alt='finish decoration' />
          </div>
        }
        {
          this.state.isComplete === true &&
          <div className='everything-done'>
            <h3> Hoàn tất gửi tin nhắn !</h3>
            <img src={finishDecoration} alt='done' />
          </div>
        }
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    customerInfo: state.contactReducer,
    messageDone: state.messageReducer
  }
}

export default connect(mapStateToProps, null)(Complete);
