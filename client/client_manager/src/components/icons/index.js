import React from 'react'
import People from './people'
import Phone from './phone'
import Search from './search'
import Dropdown from './dropdown'
import Success from './success'
import Fail from './fail'
import Send from './send'

export default props => {
  switch (props.name) {
    case 'people':
      return <People />
    case 'phone':
      return <Phone />
    case 'search':
      return <Search />
    case 'dropdown':
      return <Dropdown />
    case 'success':
      return <Success />
    case 'fail':
      return <Fail />
    case 'send':
      return <Send />
    default:
      return null
  }
}
