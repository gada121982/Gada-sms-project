import React from 'react'
import People from './people'
import Notebook from './notebook'
import Phone from './phone'
import Search from './search'
import Mail from './mail'

export default props => {
  switch (props.name) {
    case 'people':
      return <People />
    case 'notebook':
      return <Notebook />
    case 'phone':
      return <Phone />
    case 'search':
      return <Search />
    case 'mail':
      return <Mail />
    default:
      return null
  }
}
