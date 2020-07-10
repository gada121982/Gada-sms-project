import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import * as messageAction from '../../actions/messageAction'
import * as stepAction from '../../actions/stepAction'
import classNames from 'classnames'
import Icon from '../icons/index'
import { connect } from 'react-redux'
import './SmsEditing.css'


class SmsEditing extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      isSelectTemplate: true,
      isSelected: false,
      templateSelected: '',
      goNextStep: false
    }
  }

  onChangeCheckedBox = event => {
    this.setState({
      isSelectTemplate: event.target.value === '1' ? true : false
    })
  }

  onSelectTemplate = template => {
    this.props.commitMessage(template)
    if (template) {
      this.setState({
        isSelectTemplate: false,
      })
    }
  }

  onSubmit = event => {
    event.preventDefault()
  }

  onSubmitMessage = () => {
    this.props.switchStep(3)
    this.setState({
      goNextStep: true
    })
  }

  onChangeMessage = event => {
    if (event) {
      this.props.commitMessage(event.target.value)
    }
  }

  turnBackTemplateSelection() {
    this.setState({
      isSelectTemplate: true
    })
  }

  render() {

    let { customerName, phoneNumber } = this.props.customerInfo
    let contentMessage = this.props.messageDone.lastMessage

    if (this.state.goNextStep) {
      return <Redirect to='/complete' />
    }

    return (
      <div className='sms-editing'>
        <div className='sms-editing-control'>
          <div className='contact-selected'>
            <h4>Thông tin người nhận</h4>
            <div>
              <div className='customer-name-selected'>
                <Icon name='people' />
                <span> {customerName} </span>
              </div>
              <div className='phone-number-selected'>
                <Icon name='phone' />
                <span> {phoneNumber} </span>
              </div>
            </div>
          </div>

          <div className='checkbox-selection'>
            <div className='follow-template'>
              <input id='follow-template'
                name='type-selection'
                type='radio' value={1}
                onChange={this.onChangeCheckedBox}
                checked={this.state.isSelectTemplate} />
              <label
                htmlFor='follow-template'
                className={classNames({ 'active-checked': this.state.isSelectTemplate === true })}>
                Mẫu tin nhắn
              </label>
            </div>
            <div className='compose-manual'>
              <input id='compose-manual'
                name='type-selection'
                type='radio'
                value={0}
                onChange={this.onChangeCheckedBox}
                checked={!this.state.isSelectTemplate} />

              <label
                htmlFor='compose-manual'
                className={classNames({ 'active-checked': this.state.isSelectTemplate === false })}>
                Trình biên soạn
              </label>
            </div>
          </div>

        </div>
        {
          this.state.isSelectTemplate === true &&
          <div className='sms-template-wrap'>
            {
              this.props.templateData.smsTemplates.map((template, index) => {
                return (
                  <div className='sms-template-element' key={index}>
                    <div onClick={() => this.onSelectTemplate(template)} className='select-template-button'>
                      <Icon name='mail' />
                    </div>
                    <span>
                      {
                        template
                      }
                    </span>
                  </div>
                )
              })
            }
          </div>
        }
        {
          this.state.isSelectTemplate === false &&
          <div className='compose-sms-wrap'>
            <form onSubmit={this.onSubmit}>
              <textarea onChange={event => this.onChangeMessage(event)} defaultValue={contentMessage} name='smscontent'>
              </textarea>
              <input onClick={this.onSubmitMessage} type='submit' value='Xác nhận'></input>
            </form>
          </div>
        }

      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    templateData: state.templateReducer,
    customerInfo: state.contactReducer,
    messageDone: state.messageReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    commitMessage: message => {
      dispatch(messageAction.commitMessage(message))
    },
    switchStep: stepActive => {
      dispatch(stepAction.switchStep(stepActive))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SmsEditing)
