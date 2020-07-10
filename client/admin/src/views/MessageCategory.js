import React, { PureComponent } from 'react';
import { CategoryConfig } from '../config'
import Axios from 'axios'
import Icon from '../components/icons/index'
import Util from '../utils/index'
import './MessageCategory.css'


class MessageCategory extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      categorys: [],
      searchText: '',
      categoryToSave: '',
      isAddCategory: false,
      respondAdd: {
        isHide: true,
        status: null,
        message: ''
      },
    }
  }

  async componentDidMount() {
    let { data } = await Axios.get(CategoryConfig.GetAllCategoryUrl);
    this.setState({
      categorys: data.message
    })
  }

  onSearchChange = event => {
    this.setState({
      searchText: event.target.value
    })
  }

  onChangeCategoryInput = event => {
    this.setState({
      categoryToSave: event.target.value
    })
  }

  onAddCategory = async event => {
    event.preventDefault()
    const categoryName = this.state.categoryToSave

    if (categoryName) {
      let { data } = await Axios.post(CategoryConfig.AddCategoryUrl, {
        name: categoryName
      })

      this.setState({
        categorys: data.newCategory === undefined ? this.state.categorys : [...this.state.categorys, data.newCategory],
        respondAdd: {
          isHide: false,
          status: data.status,
          message: data.message
        }
      })
      return
    }
    this.setState({
      respondAdd: {
        isHide: false,
        status: false,
        message: ['Input must have value']
      }
    })

  }

  onDelete = async (_id, categoryName) => {
    let reply = window.confirm(`do you want delete ${categoryName} category?`)

    if (reply) {
      await Axios.post(CategoryConfig.DeleteCategoryUrl, { _id, categoryName })

      let newCategorys = this.state.categorys.filter((category) => {
        return category._id !== _id
      })
      this.setState({
        categorys: newCategorys
      })
    }
  }

  switchToAddCategoryPage = () => {
    this.setState({
      isAddCategory: true
    })
  }

  switchToListCategoryPage = () => {
    this.setState({
      isAddCategory: false,
      respondAdd: {
        isHide: true,
        status: null,
        message: ''
      }
    })
  }

  render() {
    if (!this.state.isAddCategory) {
      return (
        <div className='message-category'>
          <div className='message-category-header'>
            <div className='search-bar-category'>
              <Icon name='search' />
              <input onChange={this.onSearchChange} placeholder='Search message category' />
            </div>
            <div className='search-bar-category-right'>
              <div className='add-category' onClick={this.switchToAddCategoryPage}>
                <span>Add</span>
              </div>
              <h3>Message category</h3>
            </div>
          </div>
          <table className='message-category-list'>
            <thead>
              <tr>
                <th>STT</th>
                <th>Category name</th>
                <th>Created at</th>
                <th>Updated at</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.categorys.map((data, index) => {
                  if (Util.isMatchCategory(data, this.state.searchText)) {
                    return (
                      <tr key={index} >
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.createdAt}</td>
                        <td>{data.updatedAt}</td>
                        <td>
                          <div
                            className='delete-category'
                            onClick={() => this.onDelete(data._id, data.name)}>
                            <Icon name='delete' />
                            <span>Delete</span>
                          </div>
                        </td>
                      </tr>
                    )
                  }
                  return null
                })
              }
            </tbody>
          </table>
        </div>
      )
    }
    if (this.state.isAddCategory) {
      return (
        <div className='add-category-wrap'>
          <div className='add-category-heading'>
            <span>Edit</span>
            <h2>Message Category</h2>
            <div className='return-to-category-list-page' onClick={this.switchToListCategoryPage}></div>
          </div>

          {
            this.state.respondAdd.isHide === false && this.state.respondAdd.status === true &&
            <div className='respond-message-success'>
              {
                this.state.respondAdd.message.map((payload, index) => {
                  return <span key={index}>{payload}</span>
                })
              }
            </div>
          }
          {
            this.state.respondAdd.isHide === false && this.state.respondAdd.status === false &&
            <div className='respond-message-fail'>
              {
                this.state.respondAdd.message.map((payload, index) => {
                  return <span key={index}>{payload}</span>
                })
              }
            </div>
          }

          <form className='add-category-form' onSubmit={this.onAddCategory}>
            <label htmlFor='category-name-to-save'>
              Category name
            </label>
            <input
              type='text'
              id='category-name-to-save'
              onChange={this.onChangeCategoryInput}
              placeholder='Type category name' />
            <input type='submit' value='Submit' />
          </form>

        </div>
      )
    }

  }
}

export default MessageCategory;
