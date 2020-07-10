import React, { PureComponent } from 'react';
import Contact from '../components/information/Contact'
import ContactList from '../components/information/ContactList'
import './Information.css'

class Information extends PureComponent {

  render() {
    return (
      <div className='information' >
        <Contact />
        <ContactList />
      </div>
    )
  }
}

export default Information;
