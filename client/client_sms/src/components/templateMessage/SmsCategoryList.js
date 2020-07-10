import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import classNames from 'classnames'
import { filterCategory } from '../../utils'
import Icon from '../icons/index'
import * as messageAction from '../../actions/messageAction'
import { Category, Template } from '../../config'
import pending from '../../assets/images/pendingData.gif'
import './SmsCategoryList.css'


class SmsCategoryList extends PureComponent {

  constructor(props) {
    super(props)
    this.isComponentMounted = false
    this.state = {
      isPending: true,
      filterData: '',
      categoryActive: null,
      categoryList: []
    }
  }

  async componentDidMount() {
    this.isComponentMounted = true
    const { data } = await Axios.get(Category.getAllCategory)

    if (data.status === true && this.isComponentMounted === true) {
      this.setState({
        categoryList: data.message,
        isPending: false
      })
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
  getTemplateByCategory = async (category, index) => {
    this.setState({
      categoryActive: index
    })
    const { data } = await Axios.post(Template.getTemplesByCategory, {
      categoryName: category
    })

    console.log(data)
    if (data.status === true) {
      let flagData = data.message.map((element) => {
        return element.content
      })

      this.props.showTemplate(flagData)
    }
  }
  render() {

    return (
      <div className='sms-category-list'>
        <div className='search-category-list'>
          <Icon name='search' />
          <input onChange={this.onChange} placeholder='Search SMS Template'></input>
        </div>
        <div className='data-category'>
          {
            this.state.isPending === true &&
            <div className='pending'> <img src={pending} alt='pending' /></div>
          }
          {
            this.state.categoryList.map((category, index) => {
              if (filterCategory(category.name, this.state.filterData) === true) {
                return (
                  <div
                    className={classNames({
                      'data-category-payload': true,
                      'category-active': this.state.categoryActive === index
                    })}
                    key={index}
                    onClick={() => this.getTemplateByCategory(category.name, index)}>

                    <span>{category.name}</span>
                  </div>
                )
              }
              return
            })
          }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showTemplate: smsTemplate => {
      dispatch(messageAction.showTemplate(smsTemplate))
    }
  }
}


export default connect(null, mapDispatchToProps)(SmsCategoryList)