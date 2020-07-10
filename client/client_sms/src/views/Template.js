import React, { PureComponent } from 'react'
import SmsCategoryList from '../components/templateMessage/SmsCategoryList'
import SmsEditing from '../components/templateMessage/SmsEditing'
import './Template.css'

class Template extends PureComponent {
  render() {
    return (
      <div className='template-suggestion'>
        <SmsEditing />
        <SmsCategoryList />
      </div>
    )
  }
}

export default Template;
