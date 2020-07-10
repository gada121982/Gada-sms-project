import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { redirectToMessagePage } from '../../config'
import classNames from 'classnames'
import * as stepAction from '../../actions/stepAction'
import './Navigation.css'

class Navigation extends PureComponent {

  onActiveStep = tag => {
    switch (tag) {
      case 1:
        this.props.switchStep(1)
        break
      case 2:
        this.props.switchStep(2)
        break
      case 3:
        this.props.switchStep(3)
        break

      default:
        return
    }
  }

  componentDidMount() {
    if (window.location.href !== redirectToMessagePage) {
      window.location = redirectToMessagePage
    }
  }
  render() {
    return (
      <nav className='navigation'>
        <div className='step-wrapper'>

          <NavLink
            onClick={() => this.onActiveStep(1)}
            exact to='/message'
            className='step flex-column-center'>
            <h4
              className={classNames({ 'active-step-h4': this.props.step.stepActive === 1 })}>
              Nhập thông tin
            </h4>
            <div
              className={classNames({ 'active-step-circle': this.props.step.stepActive === 1 })}>
              <span>1</span>
            </div>
          </NavLink>

          <NavLink
            onClick={() => this.onActiveStep(2)}
            exact to='/template'
            className='step flex-column-center'>
            <h4
              className={classNames({ 'active-step-h4': this.props.step.stepActive === 2 })}>
              Chọn mẫu tin nhắn
            </h4>
            <div className={classNames({ 'active-step-circle': this.props.step.stepActive === 2 })}>
              <span>2</span>
            </div>
          </NavLink>

          <NavLink
            onClick={() => this.onActiveStep(3)}
            exact to='/complete'
            className='step flex-column-center'>
            <h4
              className={classNames({ 'active-step-h4': this.props.step.stepActive === 3 })}>
              Hoàn thành
            </h4>
            <div className={classNames({ 'active-step-circle': this.props.step.stepActive === 3 })}>
              <span>3</span>
            </div>
          </NavLink>
        </div>
        <div className='step-bar-wrapper'>
          <div
            className={
              classNames(
                {
                  'step-bar': true,
                  'step-bar-1': this.props.step.stepActive === 1,
                  'step-bar-2': this.props.step.stepActive === 2,
                  'step-bar-3': this.props.step.stepActive === 3,
                })}>

          </div>
        </div>
      </nav>
    )
  }
}


const mapStateToProps = state => {
  return {
    step: state.stepReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    switchStep: stepActive => {
      dispatch(stepAction.switchStep(stepActive))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)