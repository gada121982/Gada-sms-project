import React, { PureComponent } from 'react';
import { TemplateConfig, CategoryConfig } from '../config'
import Icon from '../components/icons/index'
import Util from '../utils/index'
import './MessageTemplate.css'
import Axios from 'axios';

class MessageTemplate extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      templates: [],
      categorys: [],
      respondAdd: {
        isHide: true,
        status: null,
        message: ''
      },
      respondEdit: {
        isHide: true,
        status: null,
        message: ''
      },
      searchText: '',
      templateToSave: '',
      templateCategoryToSave: '',
      templateToEdit: {},
      isEditTemplate: false,
      isAddTemplate: false
    }
  }

  async componentDidMount() {
    let { data } = await Axios.get(TemplateConfig.GetAllTemplateUrl)
    let dataCategory = await Axios.get(CategoryConfig.GetAllCategoryUrl)

    this.setState({
      templates: data.payload,
      categorys: dataCategory.data.message,
      templateCategoryToSave: dataCategory.data.message[0].name
    })
  }

  onSearchChange = event => {
    this.setState({
      searchText: event.target.value
    })
  }

  onChangeTemplateInput = event => {
    this.setState({
      templateToSave: event.target.value
    })
  }

  onChangeTemplateCategory = event => {
    this.setState({
      templateCategoryToSave: event.target.value
    })
  }

  onAddTemplate = async event => {
    event.preventDefault()

    if (this.state.templateToSave && this.state.templateCategoryToSave) {
      let { data } = await Axios.post(TemplateConfig.AddTemplateUrl, {
        category: this.state.templateCategoryToSave,
        content: this.state.templateToSave
      })

      this.setState({
        templates: data.newTemplate === undefined ? this.state.templates : [...this.state.templates, data.newTemplate],
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

  onDelete = async _id => {
    let reply = window.confirm(`Do you want to delete this template?`)

    if (reply) {
      let { data } = await Axios.post(TemplateConfig.DeleteTemplateUrl, { _id })

      if (data.status) {
        let newTemplate = this.state.templates.filter((template) => {
          return template._id !== _id
        })
        this.setState({
          templates: newTemplate
        })
        return
      }
      alert('Delete fail')
    }

  }

  switchToAddTemplatePage = () => {
    this.setState({
      isEditTemplate: false,
      isAddTemplate: true
    })
  }

  switchToListTemplatePage = () => {
    this.setState({
      templateToSave: '',
      respondAdd: {
        isHide: true,
        status: null,
        message: ''
      },
      respondEdit: {
        isHide: true,
        status: null,
        message: ''
      },
      isAddTemplate: false,
      isEditTemplate: false
    })
  }

  onEdit = templateId => {
    // find template by template id
    let templateEdit = this.state.templates.filter((value) => {
      return value._id === templateId
    })
    // set state with template above    
    this.setState({
      templateToEdit: templateEdit[0],
      isEditTemplate: true,
      isAddTemplate: false
    })
  }

  onEditCategory = event => {

    let newTemplateToEdit = { ...this.state.templateToEdit }
    newTemplateToEdit.category = event.target.value

    this.setState({
      templateToEdit: newTemplateToEdit
    })
  }

  onEditTemplate = async event => {
    event.preventDefault()
    const { _id, category, content } = this.state.templateToEdit
    let newTemplates = [...this.state.templates]

    if (category && content) {
      let { data } = await Axios.post(TemplateConfig.UpdateTemplateUrl, {
        _id,
        data: {
          category,
          content
        }
      })

      if (data.newTemplate) {
        this.state.templates.forEach((template, index) => {
          if (template._id === _id) {
            let newTemplate = { ...template }

            newTemplate.content = data.newTemplate.content
            newTemplate.category = data.newTemplate.category

            newTemplates[index] = newTemplate
            return
          }
        })
      }

      this.setState({
        templates: newTemplates,
        respondEdit: {
          isHide: false,
          status: data.status,
          message: data.message
        }
      })
      return
    }

    this.setState({
      respondEdit: {
        isHide: false,
        status: false,
        message: ['Input must have value']
      }
    })

  }

  onEditTemplateContent = event => {
    let newTemplateToEdit = { ...this.state.templateToEdit }
    newTemplateToEdit.content = event.target.value

    this.setState({
      templateToEdit: newTemplateToEdit
    })
  }

  render() {
    if (!this.state.isAddTemplate && !this.state.isEditTemplate) {
      return (
        <div className='message-template'>
          <div className='message-template-header'>
            <div className='search-bar-template'>
              <Icon name='search' />
              <input onChange={this.onSearchChange} placeholder='Search message template' />
            </div>
            <div className='search-bar-template-right'>
              <div className='add-template' onClick={this.switchToAddTemplatePage}>
                <span>Add</span>
              </div>
              <h3>Message template</h3>
            </div>
          </div>
          <table className='message-template-list'>
            <thead>
              <tr>
                <th>STT</th>
                <th>Content</th>
                <th>Category name</th>
                <th>Update at</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.templates.map((data, index) => {
                  if (Util.isMatchTemplate(data, this.state.searchText)) {
                    return (
                      <tr key={index} >
                        <td>{index + 1}</td>
                        <td>{data.content}</td>
                        <td>{data.category}</td>
                        <td>{data.updatedAt}</td>
                        <td>
                          <div
                            className='delete-template'
                            onClick={() => this.onDelete(data._id)}>
                            <Icon name='delete' />
                            <span>Delete</span>
                          </div>
                          <div
                            className='edit-template'
                            onClick={() => this.onEdit(data._id)}>

                            <Icon name='edit' />
                            <span>Edit</span>
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
    if (this.state.isAddTemplate) {
      return (
        <div className='add-template-wrap'>
          <div className='add-template-heading'>
            <span>Add</span>
            <h2>Message template</h2>
            <div className='return-to-template-list-page' onClick={this.switchToListTemplatePage}></div>
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

          <form className='add-template-form' onSubmit={this.onAddTemplate}>
            <label htmlFor='category-name-add'>Category name</label>
            <select id='category-name-add' onChange={this.onChangeTemplateCategory} defaultValue={this.state.templateCategoryToSave}>
              {
                this.state.categorys.map((category, index) => {
                  return <option key={index} value={category.name}>{category.name}</option>
                })
              }
            </select>
            <label htmlFor='category-name-add'>Template content</label>
            <textarea
              type='text'
              id='template-name-to-save'
              onChange={this.onChangeTemplateInput}
              placeholder='Type template content' />
            <input type='submit' value='Submit' />
          </form>
        </div>
      )
    }
    if (this.state.isEditTemplate) {
      return (
        <div className='edit-template-page'>
          <div className='edit-template-heading'>
            <span>Edit</span>
            <h2>Message template</h2>
            <div className='return-to-template-list-page' onClick={this.switchToListTemplatePage}></div>
          </div>

          {
            this.state.respondEdit.isHide === false && this.state.respondEdit.status === true &&
            <div className='respond-message-success'>
              {
                this.state.respondEdit.message.map((payload, index) => {
                  return <span key={index}>{payload}</span>
                })
              }
            </div>
          }
          {
            this.state.respondEdit.isHide === false && this.state.respondEdit.status === false &&
            <div className='respond-message-fail'>
              {
                this.state.respondEdit.message.map((payload, index) => {
                  return <span key={index}>{payload}</span>
                })
              }
            </div>
          }
          <form className='edit-template-form' onSubmit={this.onEditTemplate}>
            <label htmlFor='category-name-edit'>Category name</label>
            <select id='category-name-edit' onChange={this.onEditCategory} defaultValue={this.state.templateToEdit.category}>
              {
                this.state.categorys.map((category, index) => {
                  return <option key={index} value={category.name}>{category.name}</option>
                })
              }
            </select>
            <label htmlFor='category-name-edit'>Template content</label>
            <textarea
              type='text'
              id='template-name-to-save'
              onChange={this.onEditTemplateContent}
              defaultValue={this.state.templateToEdit.content}
              placeholder='Type template content' />
            <input type='submit' value='Submit' />
          </form>
        </div>
      )
    }
  }
}

export default MessageTemplate;
