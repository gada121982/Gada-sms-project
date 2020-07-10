import React from 'react'
import Search from './search'
import History from './history'
import Template from './template'
import User from './user'
import Delete from './delete'
import Edit from './edit'
import Dropdown from './dropdown'

export default props => {
  switch (props.name) {
    case 'search':
      return <Search />
    case 'history':
      return <History />
    case 'template':
      return <Template />
    case 'user':
      return <User />
    case 'delete':
      return <Delete />
    case 'edit':
      return <Edit />
    case 'dropdown':
      return <Dropdown />
    default:
      return null
  }
}
