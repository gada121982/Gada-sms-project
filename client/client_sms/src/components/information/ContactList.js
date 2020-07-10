import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as contactAction from '../../actions/contactAction'
import Axios from 'axios'
import { filterContract } from '../../utils/index'
import {
  Contact,
  redirectToLoginPage,
  redirectToLoginSfPage
} from '../../config'
import pending from '../../assets/images/pendingData.gif'
import Icon from '../icons/index'
import './ContactList.css'

class ListContact extends PureComponent {

  constructor(props) {
    super(props)
    this.isComponentMounted = false
    this.state = {
      errorSalesforce: '',
      customerInfomation: [],
      isPending: true,
      filterData: ''
    }
  }

  async componentDidMount() {
    this.isComponentMounted = true
    let { data } = await Axios.get(Contact.getContacts);

    if (data.status === true && this.isComponentMounted === true) {
      this.setState({
        isPending: false,
        customerInfomation: data.payload
      })

      return
    }

    if (!data.status && data.errorSalesforce) {
      this.setState({
        isPending: false,
        errorSalesforce: data.errorSalesforce
      })

      return
    }
    else if (!data.status && data.errorCode === 1) {
      window.location = redirectToLoginSfPage
    }
    else if (!data.status) {
      window.location = redirectToLoginPage
    }


  }

  componentWillUnmount() {
    this.isComponentMounted = false
  }

  onChange = event => {
    let value = event.target.value
    this.setState({
      filterData: value
    })
  }

  render() {
    return (
      <div className='contact-list'>

        <div className='search-contact-list'>
          <Icon name='search' />
          <input onChange={this.onChange} placeholder='Search your contacts'></input>
        </div>


        <div className='data-contact'>
          {
            this.state.errorSalesforce.length > 0 &&
            <div className='error-saleforce-api'>
              <span>{this.state.errorSalesforce}</span>
            </div>
          }
          {
            this.state.isPending === true &&
            <div className='pending'> <img src={pending} alt='pending' /></div>
          }
          {
            this.state.customerInfomation.map((data, index) => {
              if (filterContract(data, this.state.filterData) === true) {
                return (
                  <div onClick={() => this.props.commitContact(data)} className='data-contact-item' key={index}>
                    <Icon name='notebook'></ Icon>
                    <div className='data-contact-payload'>
                      <span> {data.customerName} </span>
                      <span> {data.phoneNumber} </span>
                    </div>
                  </div>
                )
              }
              return false
            })
          }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    commitContact: contact => {
      dispatch(contactAction.submitContact(contact))
    }
  }
}

export default connect(null, mapDispatchToProps)(ListContact)